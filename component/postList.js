const template = document.createElement("template");
template.innerHTML = `
    <!-- style只会应用到template内部的元素 -->
    <style>
    </style>
    <div>
    </div>
`
class PostList extends HTMLElement {
    constructor(){
        super();
        // mode:'open' 表示允许使用shadowDom的API来操作该自定义元素
        this.attachShadow({
            mode:'open'
        }).appendChild(
            template.content.cloneNode(true)
        )
    }
    // 生命周期函数，在post-list组件加载之后执行
    async connectedCallback(){
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await res.json();
        this.initPosts(posts)
    }
    initPosts(posts){
        const div = this.shadowRoot.querySelector("div");
        posts.forEach(post => {
            const blogPostEle = div.appendChild(document.createElement("blog-post"));
            // 博客标题
            blogPostEle.setAttribute('title',post.title);

            // 博客文章
            const article = blogPostEle.appendChild(
                document.createElement('article')
            )
            article.slot = "content";
            article.innerHTML = post.body
        });
    }
}
// 这里必须加上中划线 - 目的是为了区分原生的HTML
customElements.define("post-list",PostList);