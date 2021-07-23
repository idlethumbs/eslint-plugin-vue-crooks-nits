"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    
    rules: {
      "no-empty-vue-options" : {
       meta: {
         type: "warn",
 
         docs: {
             description: "Warn against empty vue options",
             category: "Bloat",
             recommended: false,
         },
         fixable: "code",
         schema: [], // no options,
         // messages: {}, 
       },
       create: function(context) {
         function checkIsOption(node) {
          if (node.parent?.parent?.parent?.type === 'ExportDefaultDeclaration' || node.parent?.parent?.type === 'ExportDefaultDeclaration') {
            if(["methods", "computed", "watch"].includes(node.name)) {
              checkIsEmptyOption(node.parent)
            }
            if(["data", "asyncData", "created", "mounted", "destroyed", "beforeDestroy", "beforeCreate"].includes(node.name)) {
              checkIsEmptyData(node)
            }
          } 
         }
         function reportEmptyOption(node, msgID = "emptyApiOption") {
           const nodeName = node.name ?? node.key.name ?? ''
           context.report({
             node,
             message: `Avoid empty ${nodeName} options`
           });
         }
         function checkIsEmptyOption(node) {
           if(!node.value.properties.length) {
             reportEmptyOption(node)
           }
         }
         function checkIsEmptyData(node) {
           if(node.parent.value) {
             switch(node.parent.value.type) {
               case "ArrowFunctionExpression":
                 if(!node.parent.value.body.properties.length) {
                   reportEmptyOption(node)
                 }
                 break
               case "FunctionExpression":
                 const functionNode = node.parent.value.body.body
                 if(!functionNode.length) {
                   reportEmptyOption(node)
                 } else if (
                   functionNode[0]?.type == "ReturnStatement" && 
                   !functionNode[0].argument?.properties.length 
                 ) {
                   reportEmptyOption(node)
                 }
                 break
               case "ObjectExpression":
                 // console.log(node.parent.value)
                 if(!node.parent.value.properties.length) {
                   reportEmptyOption(node)
                 }
                 break
             }
           }
         }
         return {
           Identifier: checkIsOption
         };
       }
      },
      "no-empty-styles" : {
       meta: {
         type: "warn",
 
         docs: {
             description: "Warn against empty vue options",
             category: "Bloat",
             recommended: false,
         },
         fixable: "code",
         schema: [], // no options,
         messages: {
          emptyApiOption : "Avoid empty options",
          testMessage: "Test",
         },
       },
       create: function(context) {
         function reportEmptyStyles(node) {
           context.report({
             node,
             message: `Avoid empty style options`
           })
         }
         function isStyleElement(node) {
           return node.type === 'VElement' && node.name === 'style'
         }
         function isEmptyStyle(node) {
           return !node.children.length
         }
         const rootAST =
                   context.parserServices.getDocumentFragment &&
                   context.parserServices.getDocumentFragment()
               
         if (rootAST) {
           const styles = rootAST.children.filter(isStyleElement)
           
           const emptyStyles = styles.filter(isEmptyStyle)

           emptyStyles.forEach(node => reportEmptyStyles(node))
         }
         return {}
       }
      }
    },
}