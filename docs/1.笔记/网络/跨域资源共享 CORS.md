# 跨域资源共享 CORS 

允许浏览器向跨源服务器，发出[`XMLHttpRequest`](https://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)请求，从而克服了AJAX只能[同源](https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)使用的限制.

## 简介

CORS需要浏览器和服务器都支持.所有浏览器都支持,IE不低于IE10.

整个CORS都是浏览器自动完成的,不需要用户参与.CORS通信与AJAX通信没有差别,代码完全一样.

浏览器一旦发现是跨域请求资源,会自动添加一些请求头信息.有时会多一次附加请求,但是用户不会有感知.

CORS实现的关键是服务器,服务器实现了CORS接口,就可以跨源通信.

## 两种请求

浏览器将请求分为**简单请求**和**复杂请求**

### 简单请求

#### 满足两个条件

1. 请求方法是以下三种:
   - HEAD
   - GET
   - POST
2. HTTP头的信息只能是以下五种
   - Accept
   - Accept-Language
   - Content-Lanauage
   - Last-Event-ID
   - Content-Type,且只能是application/x-www-form-urlencoded、multipart/form-data、text/plain

#### 流程

1. 如果浏览器发现是简单请求,就会在头信息中,增加origin字段,用来说明本次请求来自哪个源( 协议+域名|端口 ), 服务器根据这个值，决定是否同意这次请求.

2. 响应

   1.  如果Origin不在服务器的许可范围内,服务器会返回一个正常HTTP请求.浏览器接收到消息发现响应头中没有`Access-Control-Allow-Origin`字段,就知道出错了,然后抛出错误,被XMLHttpRequest的onerror捕获.

   2. 如果Origin在服务器的许可范围,服务器的响应会多出几个头信息

   3. ```json
      Access-Control-Allow-Origin: http://api.bob.com   // 该字段必须,值要么是请求Origin的值,要么是*,表示所有
      Access-Control-Allow-Credentials: true // 可选,表示是否允许发送cookie.默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器.值只能是true,如果不想发cookie,删除此字段就行
      Access-Control-Expose-Headers: FooBar // 可选. XMLHttpRequest对象的getResponseHeader()方法在默认情况下只能拿到6个基本字段:Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma.如果想拿到别的字段,就要指定.
      ```

withCredentials属性

CORS请求默认不发送cookie和HTTP认证消息.如果想把Cookie发送到服务器,一方面要服务器同意,另一方面要浏览器设置

在进行AJAX请求时,设置

```js
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

**如果要发送Cookie,Access-Control-Allow-Origin就不能设置为*,必须是明确的、与请求网页的域名一致.**

Cookie依然遵循同源策略,只有用服务域名设置的Cookie才会上传,其他域名的Cookie不会上传,且原网页代码的document.cookie也无法读取服务器域名下的Cookie

