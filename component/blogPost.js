const template = document.createElement("template");
template.innerHTML = `
    <!-- style只会应用到template内部的元素 -->
    <style>
        div {
            border:2px solid #000;
            padding:5px;
            margin-bottom:5px
        }
        h1{
            font-weight: bold;
            color: slategray;
        }
    </style>
    <div>
        <h1></h1>
        <slot name="content">默认内容</slot>
        <button>查看全文</button>
    </div>
`
class BlogPost extends HTMLElement {
    constructor(){
        super();
        // mode:'open' 表示允许使用shadowDom的API来操作该自定义元素
        this.attachShadow({
            mode:'open'
        }).appendChild(
            template.content.cloneNode(true)
        )
        // shadowRoot是shadowDom的根元素，必须要在attachShadow后使用
        this.titleEle = this.shadowRoot.querySelector("h1")
        this.articleSlot = this.shadowRoot.querySelector('slot');
        // 保存全文
        this.content = '';
        // 保存替换后的元素对象
        this.article = null;
        // 获取按钮
        this.buttonEle = this.shadowRoot.querySelector("button");
        this.showFullArticle = false;
    }
    // 为了使得attributeChangedCallback生效，需要自行定义要监听的属性
    static get observedAttributes(){
        // 返回要监听的属性名数组
        return ["title"]
    }
    /**
     * 生命周期函数:属性变化
     * @param {*} name 属性名
     * @param {*} oldValue 旧值
     * @param {*} newValue 新值
     */
    attributeChangedCallback(name,oldValue,newValue){
        if (name === 'title') {
            this.titleEle.textContent = newValue
        }
    }
    /**
     * 生命周期函数:组件创立后
     */
    connectedCallback(){
        // 给articleSlot添加事件监听器
        this.articleSlot.addEventListener('slotchange',this.slotChange.bind(this))
        //给button绑定点击事件
        this.buttonEle.addEventListener('click',this.toggleFull.bind(this))
    }
    // 监听器逻辑
    slotChange(){
        // assignedElements获取真实的替换元素
        const elements = this.articleSlot.assignedElements();
        const article = elements[0];
        this.article = article;
        this.content = this.article.innerHTML;
        // 获取摘要
        this.article.innerHTML = this.getExcept()
    }
    // 获取摘要,只展示前六十的字符
    getExcept(){
        return this.content.slice(0,60) + "..."
    }
    toggleFull(){
        this.showFullArticle = !this.showFullArticle;
        if (this.showFullArticle) {
            this.article.innerHTML = this.content;
            this.buttonEle.textContent = "隐藏全文"
        } else {
            this.article.innerHTML = this.getExcept();
            this.buttonEle.textContent = "查看全文"
        }
    }
    /**
     * 生命周期函数：组件卸载时
     */
    disconnectedCallback(){
        this.buttonEle.removeEventListener('click',this.toggleFull);
        this.articleSlot.removeEventListener('slotchange',this.slotChange)
    }
}
// 这里必须加上中划线 - 目的是为了区分原生的HTML
customElements.define("blog-post",BlogPost);