# Byteloc — Landing page de aluguel de computadores

Projeto de portfólio: landing page de uma empresa **fictícia** de locação de computadores, com motion design feito em HTML, CSS e JavaScript puros, sem frameworks nem bibliotecas.

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
- Rolagem suave no computador (estilo Lenis, feita à mão, sem biblioteca)
- Simulador de frota com total em tempo real (não coleta nenhum dado)

Quem usa a opção "reduzir movimento" do sistema vê a página sem animações.

## Estrutura

```
├── index.html  → conteúdo da página
├── style.css   → visual e animações (cores no topo, em :root)
└── main.js     → animações, rolagem suave e simulador
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

## Aviso

Byteloc é uma empresa fictícia, criada só para este portfólio. A página não tem formulário e não envia nenhum dado. Design e código por Felipe Sales.
