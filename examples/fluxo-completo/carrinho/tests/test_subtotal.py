import unittest

from carrinho import Item, subtotal


class SubtotalTests(unittest.TestCase):
    def test_lista_vazia(self):
        self.assertEqual(subtotal([]), 0)

    def test_soma_precos_e_quantidades(self):
        self.assertEqual(subtotal([Item(1990, 2), Item(550, 3)]), 5630)

    def test_preco_zero_permitido(self):
        self.assertEqual(subtotal([Item(0, 2)]), 0)

    def test_rejeita_colecao_invalida(self):
        for entrada in (None, (), "itens", {}, iter([Item(1, 1)])):
            with self.subTest(entrada=type(entrada).__name__):
                with self.assertRaises(ValueError):
                    subtotal(entrada)

    def test_rejeita_elemento_invalido(self):
        for entrada in ([None], [{}], ["item"], [Item(100, 1), object()]):
            with self.subTest(entrada=entrada):
                with self.assertRaises(ValueError):
                    subtotal(entrada)

    def test_rejeita_preco_invalido(self):
        for preco in (-1, 1.5, True, False, "100", None):
            with self.subTest(preco=preco):
                with self.assertRaises(ValueError):
                    subtotal([Item(preco, 1)])

    def test_rejeita_quantidade_invalida(self):
        for quantidade in (0, -1, 2.0, True, False, "1", None):
            with self.subTest(quantidade=quantidade):
                with self.assertRaises(ValueError):
                    subtotal([Item(100, quantidade)])

    def test_preserva_lista_e_itens_no_sucesso(self):
        itens = [Item(1990, 2), Item(550, 3)]
        original = itens.copy()
        valores_originais = [(item.preco_centavos, item.quantidade) for item in itens]
        self.assertEqual(subtotal(itens), 5630)
        self.assertEqual(itens, original)
        self.assertEqual([(item.preco_centavos, item.quantidade) for item in itens],
                         valores_originais)
        self.assertEqual(len(itens), 2)
        self.assertIs(itens[0], original[0])
        self.assertIs(itens[1], original[1])

    def test_preserva_lista_e_itens_no_erro(self):
        itens = [Item(1990, 2), Item(-1, 3)]
        original = itens.copy()
        valores_originais = [(item.preco_centavos, item.quantidade) for item in itens]
        with self.assertRaises(ValueError):
            subtotal(itens)
        self.assertEqual(itens, original)
        self.assertEqual([(item.preco_centavos, item.quantidade) for item in itens],
                         valores_originais)
        self.assertEqual(len(itens), 2)
        self.assertIs(itens[0], original[0])
        self.assertIs(itens[1], original[1])

    def test_preserva_precisao_inteira(self):
        resultado = subtotal([Item(9007199254740993, 3)])
        self.assertEqual(resultado, 27021597764222979)
        self.assertIs(type(resultado), int)
