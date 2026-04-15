# 🎨 Design System Imperium Bikes

## Cores Premium

```
Primárias (Fundação)
├── Background Main: #f4f0ea (Bege claro - 94% branco)
├── Background Light: #ffffff (Branco puro)
└── Background Dark: #1f1b17 (Preto quente - 88% opacidade)

Textos
├── Primary Text: #1c1b17 (Preto premium)
├── Secondary Text: #7a6a5a (Marrom médio)
└── Tertiary Text: #9b8f80 (Marrom claro)

Bordas
├── Border: #e2dcd2 (Bege claro)
└── Border Strong: #b09b82 (Ouro médio)

Premium Gold
├── Gold Light: #d4cdc2 (Ouro claro)
├── Gold Main: #b09b82 (Ouro premium)
└── Gold Dark: #8a765d (Ouro escuro)
```

## Tipografia

### Famílias
- **Serif Editorial**: Cormorant Garamond (títulos, nomes de produtos)
- **Sans Funcional**: Inter (corpo de texto, botões, formulários)

### Escalas
```
h1: 3rem (48px) - Letter-spacing: 2px
h2: 2.2rem (35px) - Letter-spacing: 1.5px
h3: 1.6rem (26px) - Letter-spacing: 1px
p: 1rem (16px) - Color: Secondary Text
```

## Espaçamento

```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

## Componentes

### Buttons
- **Primary (Gold)**: Fundo ouro, texto branco, hover com ouro escuro
- **Secondary (Outline)**: Borda ouro, texto ouro, hover com fundo ouro claro
- **Small**: Versão compacta para tabelas e ações secundárias

### Cards
- Borda 1px solid border color
- Sombra suave (var(--shadow-sm))
- Hover: translateY(-6px), shadow-premium
- Transição 0.25s ease

### Inputs
- Borda 1px solid border
- Focus: border-color gold-main, shadow rgba(176, 155, 130, 0.1)
- Background: bg-main (padrão), bg-light (focus)

### Badges
- Gold main background
- Texto branco
- Text-transform: uppercase
- Letter-spacing: 1px
- Posição: absolute top-left

## Sombras

```
shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.04)
shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08)
shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.12)
shadow-premium: 0 12px 20px -8px rgba(75, 60, 45, 0.2)
```

## Z-Index Scale

```
z-dropdown: 1000
z-sticky: 100
z-modal: 1300
z-tooltip: 1400
```

## Breakpoints

```
Desktop: 1440px+
Tablet: 768px - 1023px
Mobile: < 768px
```

## Identidade Visual

✨ **Elegância romana + editorial premium**
- Tudo em ouro e tonalidades naturais
- Espaçamento generoso
- Tipografia sofisticada
- Efeito hover elegante (não exagerado)
- Confiança através da consistência

## Como Usar

### Importar tema global:
```jsx
import './styles/theme.css';
```

### Usar variáveis CSS:
```css
background-color: var(--bg-light);
color: var(--gold-main);
padding: var(--spacing-lg);
box-shadow: var(--shadow-md);
```

### Em React:
```jsx
<button style={{ backgroundColor: 'var(--gold-main)' }}>
  Click me
</button>
```

## Status Colors

```
Success: #2e7d32 (verde)
Warning: #f57c00 (laranja)
Danger: #c62828 (vermelho)
Info: #0277bd (azul)
```

---

Desenvolvido com ❤️ para Imperium Bikes

