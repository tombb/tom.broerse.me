---
title: Blog
layout: default
---

Blog
====


{% for post in site.posts %}
<span class="date">{{ post.date | date: "%b %e<br>%Y" }}</span>
{{ post.title }}
----------------------------------------------------

{{ post.content }}

{% endfor %}