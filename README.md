# eslint-plugin-vue-crooks-nits

Some custom ESLint rules to catch vue niggles such as empty options and empty style tags.

## Usage

install package, include plugin rules in your .eslintrc

```
plugins: ['vue-crooks-nits'],
  rules: {
    'vue-crooks-nits/no-empty-vue-options': 1,
    'vue-crooks-nits/no-empty-styles': 1,
  },
```
---

## Rules
### 'no-empty-vue-options'

>Warns against empty Vue options such as examples below:

```
<script>
export default {
  created() {}, // WARN
  methods: {
    // Comment in code // WARN
  }, 
  data() {
    return {}  // WARN
  },
  data: () => {}, // WARN
}
</script>
```
---

### 'no-empty-styles'

>Warns against empty style tags such as:

`<style lang="scss"></style> // WARN!`
