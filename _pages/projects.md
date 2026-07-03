---
layout: page
title: Portfolio
description: A selection of experiments in evidence-based, engagement-focused design.
meta_title: Portfolio — Johar Singh
permalink: /portfolio/
meta_description: A selection of experiments in evidence-based, engagement-focused design — microlearning and simulation-based learning.
wide: true
---

<div class="row">
  {% assign sorted = site.projects | sort: 'date' | reverse %}
  {% for project in sorted %}
  <article class="project col col-4 col-w-6 col-t-12">
    <div class="project__content">
      {% if project.image %}
      <div class="project__head">
        <div class="project__image">
          <img class="lazy" data-src="{{ site.baseurl }}{{ project.image }}" alt="{{ project.title }}">
        </div>
      </div>
      {% endif %}
      <div class="project__inner">
        <div class="project__info">
          {% if project.subtitle %}
          <div class="project__subtitle">{{ project.subtitle }}</div>
          {% endif %}
        </div>
        <h3 class="project__title">
          <a href="{{ site.baseurl }}{{ project.url }}" class="project__link">{{ project.title }}</a>
        </h3>
        {% if project.summary %}
        <p class="project__excerpt">{{ project.summary }}</p>
        {% endif %}
      </div>
    </div>
  </article>
  {% endfor %}
</div>
