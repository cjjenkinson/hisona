import colors from './colors'

const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic',
}

const style = {
  h1: {
    fontSize: 29,
    fontWeight: 600,
    lineHeight: 32,
    marginBottom: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 28,
    marginBottom: 28,
  },
  h3: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 24,
    marginBottom: 24,
  },
  h4: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 20,
    marginBottom: 24,
  },
  h5: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 20,
    marginBottom: 44,
  },
  h6: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 32,
    color: colors.tint_50,
    marginBottom: 40,
    tranform: 'uppercase',
  },
  small: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
    marginTop: 12,
  },
  normal: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
    marginTop: 12,
  },
}

export default {
  type,
  style,
}
