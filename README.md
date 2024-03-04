# Web-Component-Demo
## 开发流程
1. 创建一个类或函数来指定 web 组件的功能，如果使用类，请使用 ECMAScript 2015 的类语法。
2. 使用 customElements.define('my-button', MyButton);方法注册你的新自定义元素，并向其传递要定义的元素名称、指定元素功能的类、以及可选的其所继承自的元素。（注册名字必须加上中划线 - 目的是为了区分原生的HTML）
3. 使用 `[Element.attachShadow()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow)` 方法将一个 shadow DOM 附加到自定义元素上。使用通常的 DOM 方法向 shadow DOM 中添加子元素、事件监听器等等。
4. 使用 `[<template>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)` 和 `[<slot>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot)` 定义一个 HTML 模板。再次使用常规 DOM 方法克隆模板并将其附加到你的 shadow DOM 中。
5. 在页面任何你喜欢的位置使用自定义元素，就像使用常规 HTML 元素那样。