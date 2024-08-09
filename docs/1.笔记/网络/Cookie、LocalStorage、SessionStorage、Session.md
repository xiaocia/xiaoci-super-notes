# Cookie、LocalStorage、SessionStorage、Session

## Cookie

### 特性:

1. Cookie一旦创建,**名称就无法修改**.

2. Cookie遵循同源策略.

   1. 当前域名或者父域名下的Cookie.

   2. 当前路径或父路径下的Cookie.

   3. 只要域名和路径相同,就会被视为同源.无论HTTP还是HTTPS,无论端口.

   4. 如果Cookie上设置了Secure属性，那么就会限定此Cookie只能以https传送.

   5. ```json
      cookie1: [name=value, domain=.hello.info path=/]
      cookie2: [name=value, domain=persion.hello.info path=/test]     
      cookie3: [name=value, domain=www.hello.info path=/]
      cookie4: [name=value, domain=persion.hello.info path=/]
      ```

   6. 当访问`persion.hello.info` 时:

      1. cookie1会被携带,.hello.info是persion.hello.info的父域名,path也一样.
      2. cookie2不会, persion.hello.info和persion.hello.info一样,path也不一致.
      3. cookie3不会,域名不一样
      4. cookie4会,域名和path都一样

3. 若非同源,限制

   1. 不能读取
   2. dom不能获得
   3. AJAX发送不会携带

4. 没个域名不超过20,大小不超过4Kb.

5. 每次HTTP请求都会携带.

6. 可以设置到期时间.默认是会话结束时,当到期时自动销毁.

### 如何工作

当网页要发 http 请求时，浏览器会先检查是否有相应的 cookie，有则**自动**添加在 `request header` 中的 cookie 字段中。

### 使用场景

最常见的使用场景就是 Cookie 和 Session 结合使用，我们将sessionId存储到Cookie中，每次发请求都会携带这个sessionId，这样服务端就知道是谁发起的请求

### 设置

Cookie可以客户端设置,也可以服务端设置.

#### 客户端设置

```js
document.cookie = '名字=值;属性1=属性值;属性2=属性值' 
// 是追加不是覆盖
// 客户端可以设置cookie 的下列选项：Max-Age、domain、path、secure（有条件：只有在https协议的网页中，客户端设置secure类型的 cookie 才能成功）,httpOnly,设置后,js获取不到
document.cookie = '_test=123qweqweasdrt34434;domain=https://xiaoci-super-notes.vercel.app;path=/;'
```

#### 服务端设置

```js
// Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
//一个Set-Cookie字段里面，可以同时包括多个属性，没有次序的要求
// 多个cookie,设置多个Set-Cookie头
Set-Cookie: yummy_cookie=choco // 设置名为yummy_cookie值是choco的cookie
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

如果服务器想改变一个早先设置的 Cookie，必须同时满足四个条件：Cookie 的`key`、`domain`、`path`和`secure`都匹配。举例来说，如果原始的 Cookie 是用如下的`Set-Cookie`设置的

```js
Set-Cookie: key1=value1; domain=example.com; path=/blog
```

改变上面这个 Cookie 的值，就必须使用同样的`Set-Cookie`

```js
Set-Cookie: key1=value2; domain=example.com; path=/blog
```

只要有一个属性不同，就会生成一个全新的 Cookie，而不是替换掉原来那个 Cookie

### 属性

#### Expires，Max-Age

- `Expires`属性指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 Cookie。它的值是 **UTC 格式**，可以使用`Date.prototype.toUTCString()`进行格式转换。
- 如果不设置该属性，或者设为`null`，Cookie 只在当前会话（session）有效,浏览器窗口一旦关闭，当前 Session 结束，该 Cookie 就会被删除;浏览器根据本地时间，决定 Cookie 是否过期，由于本地时间是不精确的，所以没有办法保证 Cookie 一定会在服务器指定的时间过期
- `Max-Age`属性指定从现在开始 Cookie 存在的**秒数**，比如`60 * 60 * 24 * 365`（即一年）。过了这个时间以后，浏览器就不再保留这个 Cookie.
- 如果同时指定了`Expires`和`Max-Age`，那么`Max-Age`的值将优先生效.
- 如果`Set-Cookie`字段没有指定`Expires`或`Max-Age`属性，那么这个 Cookie 就是 Session Cookie，即它只在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie

### Domain，Path

- `Domain`属性指定浏览器发出 HTTP 请求时，哪些域名要附带这个 Cookie。如果没有指定该属性，浏览器会默认将其设为当前 URL 的一级域名，比如`www.example.com`会设为`example.com`，而且以后如果访问`example.com`的任何子域名，HTTP 请求也会带上这个 Cookie。如果服务器在`Set-Cookie`字段指定的域名，不属于当前域名，浏览器会拒绝这个 Cookie.
  - 属性默认为当前的一级域名
- `Path`属性指定浏览器发出 HTTP 请求时，哪些路径要附带这个 Cookie。只要浏览器发现，`Path`属性是 HTTP 请求路径的开头一部分，就会在头信息里面带上这个 Cookie。比如，`PATH`属性是`/`，那么请求`/docs`路径也会包含该 Cookie
  - `path`属性必须为绝对路径，默认为当前路径.

### Secure，HttpOnly

- `Secure`属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。另一方面，如果当前协议是 HTTP，浏览器会自动忽略服务器发来的`Secure`属性。该属性只是一个开关，不需要指定值。如果通信是 HTTPS 协议，该开关自动打开.
- `HttpOnly`属性指定该 Cookie 无法通过 JavaScript 脚本拿到，主要是`Document.cookie`属性、`XMLHttpRequest`对象和 Request API 都拿不到该属性。这样就防止了该 Cookie 被脚本读到，只有浏览器发出 HTTP 请求时，才会带上该 Cookie

## LocalStorage

—.—

## SessionStorage

—.—





## Session

### 什么是Session

在计算机,尤其是网络应用中,一般杯叫做`会话控制`.

Session就是一个对象,存储在服务的用户的信息和会话信息.

当用户在浏览器Tab页面换来换去,或者离开一会,再继续浏览器,用户的信息不会丢失.

### 起效流程

1. 浏览器请求服务器,服务器生成一个Session保存在服务.
2. 通过算法,算出生成Session的SessionID,并设置响应头的Set-Cookie响应头,将SessionID写入到浏览器的Cookie中.
3. 浏览器下一次请求时,如果Cookie还未失效,就会携带,服务器通过Cookie的SessionID,拿到Session信息,就知道会话的状态了.

### Session生命周期

根据需求设定，一般来说，半小时.

### 缺陷

Session是存储在服务器当中的，所以Session过多，会对服务器产生压力.

### Session和Cookie的区别

Cookie是存在浏览器中的文件，Session是存在服务器中的文件.



