import unittest

from carrinho import Item, Resumo, calcular_total


class ResumoTests(unittest.TestCase):
    def test_sem_desconto_por_padrao(self):
        resultado = calcular_total([Item(1990, 2), Item(550, 3)])
        self.assertEqual(resultado, Resumo(5630, 0, 1000, 6630))

    def test_desconto_e_parcelas_do_resumo(self):
        resultado = calcular_total([Item(1990, 2), Item(550, 3)], 10)
        self.assertEqual(resultado, Resumo(5630, 563, 1000, 6067))
        for valor in (resultado.subtotal_centavos, resultado.desconto_centavos,
                      resultado.frete_centavos, resultado.total_centavos):
            self.assertIs(type(valor), int)

    def test_desconto_maximo_e_meio_centavo_para_cima(self):
        self.assertEqual(calcular_total([Item(101, 1)], 50),
                         Resumo(101, 51, 1000, 1050))

    def test_arredondamento_abaixo_no_meio_e_acima(self):
        casos = ((101, 25, 1076), (102, 26, 1076), (103, 26, 1077))
        for valor, desconto, total in casos:
            with self.subTest(valor=valor):
                self.assertEqual(calcular_total([Item(valor, 1)], 25),
                                 Resumo(valor, desconto, 1000, total))

    def test_desconto_calculado_uma_vez_sobre_subtotal(self):
        self.assertEqual(calcular_total([Item(1, 1), Item(1, 1)], 50),
                         Resumo(2, 1, 1000, 1001))

    def test_frete_abaixo_no_limiar_e_acima(self):
        casos = ((9999, 1000, 10999), (10000, 0, 10000), (10001, 0, 10001))
        for subtotal, frete, total in casos:
            with self.subTest(subtotal=subtotal):
                self.assertEqual(calcular_total([Item(subtotal, 1)], 0),
                                 Resumo(subtotal, 0, frete, total))

    def test_desconto_pode_retornar_a_frete_pago(self):
        self.assertEqual(calcular_total([Item(10000, 1)], 1),
                         Resumo(10000, 100, 1000, 10900))

    def test_base_descontada_exatamente_no_limiar(self):
        self.assertEqual(calcular_total([Item(20000, 1)], 50),
                         Resumo(20000, 10000, 0, 10000))

    def test_vazio_produz_todas_parcelas_zero(self):
        for percentual in (0, 1, 50):
            with self.subTest(percentual=percentual):
                self.assertEqual(calcular_total([], percentual), Resumo(0, 0, 0, 0))

    def test_item_de_preco_zero_nao_e_lista_vazia(self):
        self.assertEqual(calcular_total([Item(0, 1)]), Resumo(0, 0, 1000, 1000))

    def test_rejeita_desconto_invalido_inclusive_em_vazio(self):
        for percentual in (-1, 51, 0.5, True, False, "10", None):
            for itens in ([], [Item(100, 1)]):
                with self.subTest(percentual=percentual, itens=itens):
                    with self.assertRaises(ValueError):
                        calcular_total(itens, percentual)

    def test_rejeita_entrada_invalida_na_fronteira_do_resumo(self):
        entradas = [None, (), "itens", {}, [None], [Item(-1, 1)],
                    [Item(True, 1)], [Item(1.5, 1)], [Item(100, 0)],
                    [Item(100, True)], [Item(100, 1.5)]]
        for itens in entradas:
            with self.subTest(itens=itens):
                with self.assertRaises(ValueError):
                    calcular_total(itens)

    def test_preserva_lista_e_itens_no_sucesso(self):
        itens = [Item(1990, 2), Item(550, 3)]
        original = itens.copy()
        valores_originais = [(item.preco_centavos, item.quantidade) for item in itens]
        self.assertEqual(calcular_total(itens, 10), Resumo(5630, 563, 1000, 6067))
        self.assertEqual(itens, original)
        self.assertEqual([(item.preco_centavos, item.quantidade) for item in itens],
                         valores_originais)
        self.assertEqual(len(itens), 2)
        self.assertIs(itens[0], original[0])
        self.assertIs(itens[1], original[1])

    def test_preserva_lista_e_itens_no_erro_de_item(self):
        itens = [Item(1990, 2), Item(-1, 3)]
        original = itens.copy()
        valores_originais = [(item.preco_centavos, item.quantidade) for item in itens]
        with self.assertRaises(ValueError):
            calcular_total(itens, 10)
        self.assertEqual(itens, original)
        self.assertEqual([(item.preco_centavos, item.quantidade) for item in itens],
                         valores_originais)
        self.assertEqual(len(itens), 2)
        self.assertIs(itens[0], original[0])
        self.assertIs(itens[1], original[1])

    def test_preserva_lista_e_itens_no_erro_de_percentual(self):
        itens = [Item(1990, 2), Item(550, 3)]
        original = itens.copy()
        valores_originais = [(item.preco_centavos, item.quantidade) for item in itens]
        with self.assertRaises(ValueError):
            calcular_total(itens, 51)
        self.assertEqual(itens, original)
        self.assertEqual([(item.preco_centavos, item.quantidade) for item in itens],
                         valores_originais)
        self.assertEqual(len(itens), 2)
        self.assertIs(itens[0], original[0])
        self.assertIs(itens[1], original[1])

    def test_preserva_precisao_acima_de_limite_de_float(self):
        self.assertEqual(calcular_total([Item(9007199254740993, 1)], 50),
                         Resumo(9007199254740993, 4503599627370497, 0,
                                4503599627370496))
