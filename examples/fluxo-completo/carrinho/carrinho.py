from dataclasses import dataclass


@dataclass(frozen=True)
class Item:
    preco_centavos: int
    quantidade: int


def _inteiro(valor: object) -> bool:
    return isinstance(valor, int) and not isinstance(valor, bool)


def subtotal(itens: list[Item]) -> int:
    if not isinstance(itens, list):
        raise ValueError("O carrinho precisa ser uma lista de itens")
    resultado = 0
    for item in itens:
        if not isinstance(item, Item):
            raise ValueError("Linha inválida no carrinho")
        if not _inteiro(item.preco_centavos) or item.preco_centavos < 0:
            raise ValueError("Preço deve ser inteiro não negativo")
        if not _inteiro(item.quantidade) or item.quantidade <= 0:
            raise ValueError("Quantidade deve ser inteiro positivo")
        resultado += item.preco_centavos * item.quantidade
    return resultado


@dataclass(frozen=True)
class Resumo:
    subtotal_centavos: int
    desconto_centavos: int
    frete_centavos: int
    total_centavos: int


def calcular_total(itens: list[Item], desconto_percentual: int = 0) -> Resumo:
    if not _inteiro(desconto_percentual) or not 0 <= desconto_percentual <= 50:
        raise ValueError("Desconto deve ser inteiro entre 0 e 50")
    valor_subtotal = subtotal(itens)
    desconto = (valor_subtotal * desconto_percentual + 50) // 100
    base_frete = valor_subtotal - desconto
    frete = 1000 if itens and base_frete < 10000 else 0
    return Resumo(valor_subtotal, desconto, frete, base_frete + frete)
