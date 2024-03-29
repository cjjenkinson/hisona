/* eslint no-eval: 0 */
import styled, { css, keyframes } from 'styled-components'

export const Gradient = (g1, g2) =>
  css`radial-gradient(ellipse farthest-corner at top left, ${g1} 0%, ${g2} 100%)`

export const Truncate = width => css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
`

export const hexa = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)

  if (alpha >= 0) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  } else {
    return `rgb(${r}, ${g}, ${b})`
  }
}

export const Shadow = {
  low: '0 2px 8px',
  mid: '0 4px 12px',
  high: '0 8px 16px',
}

export const Transition = {
  hover: {
    on: 'all 0.2s ease-in',
    off: 'all 0.2s ease-out',
  },
  reaction: {
    on: 'all 0.15s ease-in',
    off: 'all 0.1s ease-out',
  },
  dropdown: {
    off: 'all 0.35s ease-out',
  },
}

export const zIndex = new function() {
  // Write down a camel-cased element descriptor as the name (e.g. modal or chatInput).
  // Define at a component level here, then use math to handle order at a local level.
  // (e.g. const ModalInput = styled.input`z-index: zIndex.modal + 1`;)
  // This uses constructor syntax because that allows self-referential math

  this.base = 1 // z-index: auto content will go here or inherit z-index from a parent

  this.background = this.base - 1 // content that should always be behind other things (e.g. textures/illos)
  this.hidden = this.base - 2 // this content should be hidden completely (USE ADD'L MEANS OF HIDING)

  this.card = this.base + 1 // all cards should default to one layer above the base content
  this.loading = this.card + 1 // loading elements should never appear behind cards
  this.avatar = this.card + 1 // avatars should never appear behind cards
  this.form = this.card + 1 // form elements should never appear behind cards
  this.search = this.form // search is a type of form and should appear at the same level
  this.dmInput = this.form

  this.composerToolbar = 2000 // composer toolbar - should sit in between most elements

  this.chrome = 3000 // chrome should be visible in modal contexts
  this.navBar = this.chrome // navBar is chrome and should appear at the same level
  this.mobileInput = this.chrome + 1 // the chatInput on mobile should appear above the navBar
  this.dropDown = this.chrome + 1 // dropDowns shouldn't appear behind the navBar

  this.slider = window.innerWidth < 768 ? this.chrome + 1 : this.chrome // slider should appear significantly above the base to leave room for other elements
  this.composer = this.slider - 2 // composer should never appear above the slider
  this.chatInput = this.slider + 1 // the slider chatInput should always appear above the slider
  this.flyout = this.chatInput + 3 // flyout may overlap with chatInput and should take precedence

  this.fullscreen = 4000 // fullscreen elements should cover all screen content except toasts

  this.modal = 5000 // modals should completely cover base content and slider as well
  this.gallery = this.modal + 1 // gallery should never appear behind a modal

  this.toast = 6000 // toasts should be visible in every context
  this.tooltip = this.toast + 1 // tooltips should always be on top
}()

export const fontStack = css`
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica', 'Segoe',
    sans-serif;
`

export const monoStack = css`
  font-family: 'Input Mono', 'Menlo', 'Inconsolata', 'Roboto Mono', monospace;
`

const spin = keyframes`
  to {transform: rotate(360deg);}
`

export const Spinner = styled.span`
  width: ${props => (props.size ? `${props.size}px` : '32px')};
  height: ${props => (props.size ? `${props.size}px` : '32px')};

  &:before {
    content: '';
    box-sizing: border-box;
    display: inline-block;
    position: ${props => (props.inline ? 'relative' : 'absolute')};
    top: ${props => (props.inline ? '0' : '50%')};
    left: ${props => (props.inline ? '0' : '50%')};
    width: ${props => (props.size !== undefined ? `${props.size}px` : '16px')};
    height: ${props => (props.size !== undefined ? `${props.size}px` : '16px')};
    margin-top: ${props =>
      props.size !== undefined ? `-${props.size / 2}px` : '-8px'};
    margin-left: ${props =>
      props.size !== undefined ? `-${props.size / 2}px` : '-8px'};
    border-radius: 50%;
    border: ${props => '2px'} solid
      ${props =>
        props.color
          ? eval(`props.theme.${props.color}`)
          : props.theme.brand.alt};
    border-top-color: transparent;
    border-right-color: ${props =>
      props.color ? `props.theme.${props.color}` : props.theme.brand.alt};
    border-bottom-color: transparent;
    animation: ${spin} 2s linear infinite;
  }
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.text.default};

  &:not(:first-of-type) {
    margin-top: 1.5rem;
  }

  a {
    text-decoration: underline;
  }
`

export const PrefixLabel = styled.label`
  display: flex;
  width: 100%;
  margin-top: 0.25rem;
  padding-left: 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.placeholder};

  > input {
    margin-left: 2px;
  }
`

export const Input = styled.input`
  flex: 1 0 auto;
  background: ${({ theme }) => theme.bg.default};
  font-weight: 500;
  width: 100%;
  font-size: 0.875rem;
  border: 0.125rem solid ${({ theme }) => theme.bg.inactive};
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  margin-top: 0.125rem;
  box-shadow: none;

  ${props =>
    props.type === 'checkbox' &&
    css`
      flex: initial;
      width: initial;
      margin-right: 0.5rem;
    `} &::placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }
  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }
  &:-moz-placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }
  &:-ms-input-placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }

  &:focus {
    border-color: ${({ theme }) => theme.brand.default};
  }
`

export const TextArea = styled.textarea`
  flex: 1 0 auto;
  width: 100%;
  background: ${({ theme }) => theme.bg.default};
  font-weight: 500;
  font-size: 0.875rem;
  border: 0.125rem solid ${({ theme }) => theme.bg.inactive};
  border-radius: 0.25rem;
  padding: 0.75rem;
  margin-top: 0.125rem;
  box-shadow: none;

  &::placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }
  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }
  &:-moz-placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }
  &:-ms-input-placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }

  &:focus {
    border-color: ${({ theme }) => theme.brand.default};
  }
`

export const UnderlineInput = styled.input`
  font-size: inherit;
  font-weight: inherit;
  color: ${({ theme }) => theme.text.default};
  border-bottom: 0.125rem solid ${({ theme }) => theme.bg.inactive};

  &:focus {
    border-color: ${({ theme }) => theme.brand.default};
  }
`

export const H1 = styled.h1`
  ${fontStack};
  color: ${({ theme }) => theme.text.default};
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1.25;
  margin: 0;
  padding: 0;
`

export const H2 = styled.h2`
  color: ${({ theme }) => theme.text.default};
  ${fontStack};
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25;
  margin: 0;
  padding: 0;
`

export const H3 = styled.h3`
  color: ${({ theme }) => theme.text.default};
  ${fontStack};
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  padding: 0;
`

export const H4 = styled.h4`
  color: ${({ theme }) => theme.text.default};
  ${fontStack};
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
  padding: 0;
`

export const H5 = styled.h5`
  color: ${({ theme }) => theme.text.default};
  ${fontStack};
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.4;
  margin: 0;
  padding: 0;
`

export const H6 = styled.h6`
  color: ${({ theme }) => theme.text.default};
  ${fontStack};
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.675rem;
  line-height: 1.5;
  margin: 0;
  padding: 0;
`

export const P = styled.p`
  color: ${({ theme }) => theme.text.default};
  ${fontStack};
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
  padding: 0;
`

export const Span = styled.span`
  color: ${({ theme }) => theme.text.default};
  ${fontStack};
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
  padding: 0;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`

const returnTooltip = props => {
  switch (props.tipLocation) {
    case 'top-left':
      return `
          &:after {
            bottom: calc(100% + 4px);
            right: 0;
          }
          &:before {
            bottom: 100%;
            right: 0;
            transform: translateX(-100%);
      	    border-bottom-width: 0;
      	    border-top-color: ${
              props.onboarding ? props.theme.brand.alt : props.theme.bg.reverse
            };
          }
      `
    case 'top-right':
      return `
          &:after {
            bottom: calc(100% + 4px);
            left: 0;
          }
          &:before {
            bottom: 100%;
            left: 0;
            transform: translateX(100%);
      	    border-bottom-width: 0;
      	    border-top-color: ${
              props.onboarding ? props.theme.brand.alt : props.theme.bg.reverse
            };
          }
      `
    case 'top':
      return `
          &:after {
            bottom: calc(100% + 8px);
            left: 50%;
            transform: translateX(-50%);
          }
          &:before {
            bottom: calc(100% + 3px);
            left: 50%;
            transform: translateX(-50%);
            border-bottom-width: 0;
            border-top-color: ${
              props.onboarding ? props.theme.brand.alt : props.theme.bg.reverse
            };
          }
      `
    case 'right':
    default:
      return `
          &:after {
            top: 50%;
            left: calc(100% + 4px);
            transform: translateY(-50%);
          }
          &:before{
            top: calc(50% - 5px);
            left: 100%;
            border-left-width: 0;
            border-right-color: ${
              props.onboarding ? props.theme.brand.alt : props.theme.bg.reverse
            };
          }
      `
    case 'bottom-left':
      return `
          &:after {
            top: calc(100% + 4px);
            right: 0;
          }
          &:before {
            top: 100%;
            right: 0;
            transform: translateX(-100%);
      	    border-top-width: 0;
      	    border-bottom-color: ${
              props.onboarding ? props.theme.brand.alt : props.theme.bg.reverse
            };
          }
      `
    case 'bottom-right':
      return `
          &:after {
            top: calc(100% + 4px);
            left: 0;
          }
          &:before {
            top: 100%;
            left: 0;
            transform: translateX(100%);
      	    border-top-width: 0;
      	    border-bottom-color: ${
              props.onboarding ? props.theme.brand.alt : props.theme.bg.reverse
            };
          }
      `
    case 'bottom':
      return `
        &:after {
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
        }
        &:before {
          top: calc(100% + 3px);
          left: 50%;
          transform: translateX(-50%);
          border-top-width: 0;
          border-bottom-color: ${
            props.onboarding ? props.theme.brand.alt : props.theme.bg.reverse
          };
        }
      `
    case 'left':
      return `
          &:after {
            right: calc(100% + 4px);
            top: 50%;
            transform: translateY(-50%);
          }
          &:before{
            right: 100%;
            top: calc(50% - 5px);
            border-right-width: 0;
            border-left-color: ${
              props.onboarding ? props.theme.brand.alt : props.theme.bg.reverse
            };
          }
      `
  }
}

export const Tooltip = props => css`
  position: relative;

  &:after,
  &:before {
    line-height: 1;
    user-select: none;
    pointer-events: none;
    position: absolute;
    opacity: 0;
    display: block;
    text-transform: none;
  }

  &:before {
    content: '';
    z-index: ${zIndex.tooltip + 1};
    border: 6px solid transparent;
  }

  &:after {
    content: ${props.tipText && !props.onboarding
      ? `'${CSS.escape(props.tipText)}'`
      : "''"};
    z-index: ${zIndex.tooltip};
    ${fontStack};
    font-size: 14px;
    font-weight: 500;
    min-width: 8px;
    max-width: 21em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 8px 12px;
    border-radius: 8px;
    box-shadow: ${Shadow.mid} ${hexa(props.theme.bg.reverse, 0.25)};
    background: ${props.theme.bg.reverse};
    color: ${props.theme.text.reverse};
  }

  ${props.tipText && !props.onboarding ? returnTooltip(props) : ''};

  &:hover:after,
  &:hover:before {
    opacity: 1;
    transition: all 0.1s ease-in 0.1s;
  }
`

export const Onboarding = props => css`
  position: relative;

  &:after,
  &:before {
    line-height: 1;
    user-select: none;
    pointer-events: none;
    position: absolute;
    opacity: 0;
    display: block;
  }

  &:before {
    content: '';
    z-index: ${zIndex.tooltip + 1};
    border: 5px solid transparent;
  }

  &:after {
    content: ${props.onboarding ? `'${props.onboarding}'` : "''"};
    z-index: ${zIndex.tooltip};
    ${fontStack};
    text-align: left;
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
    width: 300px;
    white-space: normal;
    overflow: hidden;
    padding: 16px;
    padding-left: 20px;
    border-radius: 12px;
    background-color: ${props.theme.bg.default};
    background: ${props.theme.bg.default} url(/img/goopy-top.svg) center top
      no-repeat;
    background-size: 100%;
    color: ${props.theme.text.default};
    box-shadow: 0 8px 32px rgba(23, 26, 33, 0.35);
  }

  ${props.onboarding ? returnTooltip(props) : ''};

  &:after,
  &:before {
    opacity: 1;
    transition: all 0.1s ease-in 0.1s;
  }
`

export const HorizontalRule = styled(FlexRow)`
  position: relative;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  color: ${props => props.theme.bg.border};

  hr {
    display: inline-block;
    flex: 1 0 auto;
    border-top: 1px solid ${props => props.theme.bg.border};
  }

  div {
    margin: 0 16px;
  }
`

export const TopBorder = styled.div`
  position: fixed;
  width: 100%;
  height: 6px;
  background-image: linear-gradient(100deg, #2575fc, #e64d4d);
`

/* Content */

// body {
//     font-family: var(--font-family);
//     font-weight: var(--font-weight);
//     font-size: var(--font-size);
//     color: var(--body-color);
//     line-height: var(--line-height);
// }

// h1,
// h2,
// h3,
// h4,
// h5 {
//     font-family: var(--font-system);
//     color: var(--vg-black);
//     margin-top: 0;
// }

// h1 {
//     font-size: var(--h1-font-size);
//     font-weight: var(--h1-font-weight);
//     color: var(--h1-color);
//     line-height: var(--h1-line-height);
//     margin-bottom: var(--h1-margin-bottom);
// }

// h2 {
//     font-size: var(--h2-font-size);
//     font-weight: var(--h2-font-weight);
//     color: var(--h2-color);
//     line-height: var(--h2-line-height);
//     margin-bottom: var(--h2-margin-bottom);
// }

// h3 {
//     font-size: var(--h3-font-size);
//     font-weight: var(--h3-font-weight);
//     color: var(--h3-color);
//     line-height: var(--h3-line-height);
//     margin-bottom: var(--h3-margin-bottom);
// }

// h4 {
//     font-size: var(--h4-font-size);
//     font-weight: var(--h4-font-weight);
//     color: var(--h4-color);
//     line-height: var(--h4-line-height);
//     margin-bottom: var(--h4-margin-bottom);
// }

// h5 {
//     font-size: var(--h5-font-size);
//     font-weight: var(--h5-font-weight);
//     color: var(--h5-color);
//     line-height: var(--h5-line-height);
//     margin-bottom: var(--h5-margin-bottom);
// }

// h6 {
//     font-size: var(--h6-font-size);
//     font-weight: var(--h5-font-weight);
//     color: var(--h6-color);
//     text-transform: var(--h6-text-transform);
//     line-height: var(--h6-line-height);
//     margin-bottom: var(--h6-margin-bottom);
// }

// p {
//     font-size: var(--p-font-size);
//     font-weight: var(--p-font-weight);
//     line-height: var(--p-line-height);
//     margin-top: var(--p-margin-top);
// }

// b,
// strong {
//     font-weight: var(--font-weight-bold);
// }

// small {
//     font-size: var(--font-size-small);
// }

// a {
//     color: var(--link-color);
//     text-decoration: var(--link-text-decoration);
// }

// a:hover {
//     color: var(--link-color-hover);
//     text-decoration: var(--link-text-decoration-hover);
// }

// dl {
//     margin-bottom: 1.5rem;
// }

// dt {
//     font-weight: var(--font-weight-bold);
// }

// dd {
//     margin-left: 0;
//     margin-bottom: 1.5rem;
// }

// ol,
// ul {
//     line-height: var(--list-line-height);
//     margin-top: 0;
//     margin-bottom: 1.5rem;
// }

// blockquote {
//     border-left: solid .4rem var(--vg-tint-10);
//     padding: .5rem .5rem .5rem 1rem;
//     margin-bottom: 1.5rem;
//     margin-left: 0;
// }

// blockquote :last-child {
//     margin-bottom: 0;
// }

// abbr[title] {
//     text-decoration: none;
//     border-bottom: dashed 2px currentcolor;
// }

// code {
//     margin-top: 8px;
//     font-size: var(--code-font-size);
//     font-family: var(--font-monospace);
//     white-space: nowrap;
//     background: var(--code-bg-color);
//     border-radius: 3px;
//     padding: 12px;
// }

// pre > code {
//     display: block;
//     padding: 1rem 1.5rem;
//     white-space: pre;
//     height: var(--pre-max-height);
// }

// ::placeholder {
//     color: var(--placeholder-color);
// }

// ::selection {
//     background-color: var(--selection-bg-color);
//     color: var(--selection-color);
// }

// hr {
//     border: 1px solid var(--hr-color);
//     margin-bottom: var(--hr-margin-bottom);
// }

// /* Update */

// figure {
//     margin-top: 0;
//     margin-bottom: 1.5rem;
// }

// img {
//     height: auto;
//     max-width: 100%;
//     vertical-align: middle;
// }

// del {
//     color: var(--vg-retort);
// }

// ins {
//     color: var(--vg-repartee);
// }
