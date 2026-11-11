---
layout: page
title: Portfolio
description: "Check out a selection of my interactive eLearning experiments. Demonstrations include: in-the-flow-of-work micro-learning, branching scenarios, and simulations."
meta_title: Portfolio — Johar Singh
permalink: /portfolio/
meta_description: "Check out a selection of my interactive eLearning experiments. Demonstrations include: in-the-flow-of-work micro-learning, branching scenarios, and simulations."
hero_image: '/images/Selkie-background.webp'
wide: true
---

<div class="row">
  {% assign sorted = site.projects | sort: 'order' %}
  {% for project in sorted %}
  {% include project-card.html %}
  {% endfor %}
</div>
