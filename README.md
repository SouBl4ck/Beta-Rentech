# Landing page — Aluguel de computadores

Landing page de uma empresa de locação de computadores, com motion design feito em HTML, CSS e JavaScript puros, sem frameworks nem bibliotecas.

## Animações

- Tela de carregamento com contador de 000 a 100
- Título que aparece linha por linha, saindo de uma máscara
- Cursores "ao vivo" passeando pelo título
- Botão magnético que segue o mouse
- Seção fixa na tela que monta um computador conforme a rolagem
- Frase dividida que desliza dos dois lados
- Rabisco SVG que se desenha sozinho
- Cartões 3D que inclinam seguindo o mouse
- Linha do tempo que se preenche ao rolar
- Elementos que entram em cascata
- Barra de progresso de leitura

Quem usa a opção "reduzir movimento" do sistema vê a página sem animações.

## Estrutura

```
├── index.html      → conteúdo da página
├── css/style.css   → visual e animações (cores no topo, em :root)
└── js/main.js      → animações ligadas à rolagem e ao mouse
```

## Paleta

| Cor | Hex |
|---|---|
| Azul-marinho (fundo) | `#11293d` |
| Azul médio | `#28a0cf` |
| Ciano (destaque) | `#00baf9` |
| Gelo (texto) | `#e8f1f2` |

## Como rodar

Abra o `index.html` no navegador. Não precisa instalar nada.

## Publicar no GitHub Pages

1. Suba estes arquivos para um repositório.
2. Vá em **Settings → Pages**.
3. Em **Branch**, escolha `main` e a pasta `/ (root)`, e clique em **Save**.
4. Em cerca de um minuto o site fica no ar em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Para personalizar

Procure no `index.html` pelos textos entre colchetes e troque pelos dados reais: `[SUA MARCA]`, `[VALOR]`, `[MODELO]`, `[X]`, `[PRAZO]`, `[TELEFONE]`, `[E-MAIL]` e `[CIDADE/UF]`.

O formulário de orçamento hoje só mostra uma mensagem de confirmação. Para receber os pedidos por e-mail, dá para ligá-lo a um serviço como o [Formspree](https://formspree.io).
