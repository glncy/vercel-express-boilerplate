** Template **

```html
<% pageId = "index-page" // Must Be Unique Every Page %> 
<% title = "index" // Title Page %>

<!-- HEADER -->
<%- 
  include(`${dir}/partials/header.ejs`, 
  { 
    title: title,
    pageId: pageId
  }) 
%>

<div class="container">
  <!-- CONTENT HERE -->
  <h2>Welcome, Express!</h2>
</div>

<!-- JAVASCRIPT CDNs AND SCRIPTS -->
<%- include(`${dir}/partials/scripts.ejs`) %>

<script>
  // SCRIPTS HERE
</script>

<!-- FOOTER -->
<%- include(`${dir}/partials/footer.ejs`) %>
```
