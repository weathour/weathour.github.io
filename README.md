# texture

从thelehhman那里弄来的一个结构非常简单易懂的博客模型，又简洁又好看（最重要的是这个代码也非常简洁啊，看着英语头疼的人看着非常舒服）

**Demo**: [thelehhman.com/texture](https://thelehhman.com/texture)

这个是他的页面，想要模板的直接在github上查texture就行了。


**Texture Picker**

You can toggle the texture picker to show/experiment various textures on your site using the showPicker variable. Remember to make it `false` for production.

```yaml
texture:
  showPicker: [false|true] # show the texture selector(development purposes)
```

**Comments (Disqus)**

Comments on posts can be enabled by specifying your disqus_shortname under texture in `_config.yml`. For example,
```yaml
texture:
  disqus_shortname: games
```

**Google Analytics**

It can be enabled by specifying your analytics id under texture in `_config.yml`
```yaml
texture:
  analytics_id: '< YOUR ID >'
```

**Excerpts**

Excerpts can be enabled by adding the following line to your `_config.yml`
```yaml
show_excerpts: true
```

**Toggle Navbar**

```yaml
texture:
  showNav: true
```

**Layouts**

- Home
- Page
- Post

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/thelehhman/texture. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Development

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site! To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

When your theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled.
To add a custom directory to your theme-gem, please edit the regexp in `texture.gemspec` accordingly.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

