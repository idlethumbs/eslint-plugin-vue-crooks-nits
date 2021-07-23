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

#### **Override recommendations**

Recommend overrides for any filetypes you don't want empty 'data' objects or functions to be flagged - (when is eslint going to have rules by filetype??) 

If anyone can suggest how to improve the rule to only apply to vue file script tags that would be most welcome as I haven't as yet cracked that...

*.eslintrc.js*
```
...
overrides: [
    {
      files: ['*.js', '*.ts', '*.json'],
      rules: {
        'vue-crooks-nits/no-empty-vue-options': 'off'
      }
    }
  ],
```
---

### 'no-empty-styles'

>Warns against empty style tags such as:

`<style lang="scss"></style> // WARN!`
