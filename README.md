# lens_frontend

A frontend for converting OMA lens files to SVG.
Made to be user-friendly

Uses [lens_protocol](https://github.com/eeng/lens_protocol) for server-side OMA to SVG conversion


<p align="center">
  <img src="https://i.ibb.co/HhtcFV0/demo-lens.png" width="900"/>
</p>


### Install dependencies

```
gem install bundle
bundle install
mkdir oma
```

### Run Application

Start the server:
```
bundle exec ruby ./server.rb
```

use the client at:
[http://127.0.0.1:4567](http://127.0.0.1:4567)
