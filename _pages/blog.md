---
layout: page
title: Blog
meta_title: Blog — Johar Singh
permalink: /blog/
meta_description: Come and nerd out about the practical applications of learning science and interactive instructional design.
description: This is where I nerd out about the practical applications of learning science and interactive design.
hero_image: '/images/18.webp'
wide: true
---

<div class="row grid">
  {% for post in site.posts %}
    {% include article.html %}
  {% endfor %}
</div>
