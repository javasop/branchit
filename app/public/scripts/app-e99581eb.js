(function(){angular.module("itechdom",["ui.router","ui.bootstrap","ngScrollTo","ngSocial","pageslide-directive"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,o){return o.hashPrefix("!"),e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"}),e.state("blog",{url:"/blog",templateUrl:"app/blog/blog.html",controller:"BlogCtrl"}),e.state("about",{url:"/about",templateUrl:"app/about/about.html",controller:"AboutCtrl"}),t.otherwise("/")}])}).call(this),function(){angular.module("itechdom").service("servicesGridService",["$http",function(e){var t;return t="assets/dummy/services.json",{data:{services:[]},getServiceList:function(){return e.get(t)}}}])}.call(this),function(){angular.module("itechdom").directive("servicesGrid",function(){return{templateUrl:"components/servicesGrid/servicesGrid.html",scope:{connectWith:"="},restrict:"E",link:function(){},controller:["$rootScope","$scope","servicesGridService",function(e,t,o){return o.getServiceList().success(function(e){return t.services=e})}]}})}.call(this),function(){angular.module("itechdom").service("portfolioGridService",["$http",function(e){var t;return t="assets/dummy/portfolio.json",{data:{portfolio:[]},getPortfolioList:function(){return e.get(t)}}}])}.call(this),function(){angular.module("itechdom").directive("portfolioGrid",function(){return{templateUrl:"components/portfolioGrid/portfolioGrid.html",scope:{connectWith:"="},restrict:"E",link:function(){},controller:["$rootScope","$scope","portfolioGridService",function(e,t,o){return o.getPortfolioList().success(function(e){var o,i,l;for(i=0,l=e.length;l>i;i++)o=e[i],o.url||(o.url="/assets/images/portfolio/"+o.image);return t.portfolios=e})}]}})}.call(this),function(){angular.module("itechdom").filter("reverse",function(){return function(e){return e.slice().reverse()}})}.call(this),function(){angular.module("itechdom").directive("navbar",function(){return{templateUrl:"components/navbar/navbar.html",restrict:"E",link:function(){},controller:["$rootScope","$scope","$anchorScroll","$location","$timeout",function(e,t,o,i,l){return t.$on("$stateChangeSuccess",function(e,t){return"/"===t.url&&i.hash()?l(function(){return o()},100):void 0}),t.scrollTo=function(){return o()},t.checked=!1,t.check=function(){return t.checked=!t.checked},t.leftMenu=[{title:"Home",url:"/#!/"},{title:"Services",url:"/#!/#Services"},{title:"About Us",url:"/#!/about"}],t.rightMenu=[{title:"Portfolio",url:"/#!/#Portfolio"},{title:"Contact",url:"/#!/#Contact"},{title:"Blog",url:"/#!/blog"}]}]}})}.call(this),function(){angular.module("itechdom").service("contactInfoService",["$http",function(e){var t;return t="assets/dummy/contact.json",{data:{contact:[]},getContactText:function(){return e.get(t)}}}])}.call(this),function(){angular.module("itechdom").directive("contactInfo",function(){return{templateUrl:"components/contactInfo/contactInfo.html",scope:{connectWith:"="},restrict:"E",link:function(){},controller:["$rootScope","$scope","contactInfoService",function(e,t,o){return o.getContactText().success(function(e){return t.contact=e})}]}})}.call(this),function(){angular.module("itechdom").directive("comingSoon",function(){return{templateUrl:"components/comingSoon/comingSoon.html",scope:{connectWith:"="},restrict:"E",link:function(){},controller:["$rootScope","$scope",function(){}]}})}.call(this),function(){angular.module("itechdom").service("carouselService",["$http",function(e){var t;return t="assets/dummy/carousel.json",{data:{carousel:[]},getCarouselList:function(){return e.get(t)}}}])}.call(this),function(){angular.module("itechdom").directive("itechdomCarousel",function(){return{templateUrl:"components/carousel/carousel.html",scope:{connectWith:"="},restrict:"E",link:function(){},controller:["$rootScope","$scope","carouselService",function(e,t,o){return o.getCarouselList().success(function(e){return t.slides=e})}]}})}.call(this),function(){angular.module("itechdom").controller("MainCtrl",["$scope",function(){}])}.call(this),function(){angular.module("itechdom").service("BlogService",["$http",function(e){var t;return t="assets/dummy/blog.json",{getBlogs:function(){return e.get(t)}}}])}.call(this),function(){angular.module("itechdom").controller("BlogCtrl",["$scope","BlogService",function(e,t){return t.getBlogs().success(function(t){return e.blogs=t})}])}.call(this),function(){angular.module("itechdom").controller("AboutCtrl",["$scope",function(){}])}.call(this),angular.module("itechdom").run(["$templateCache",function(e){e.put("app/about/about.html",'<section id="About" class="module module-gray"><div class="row"><div class="col-sm-12"><div class="module-header"><h2 class="module-title">About Us</h2><h4 class="module-subtitle center-block">iTechdom is a small, innovative web design and development agency based in Denver, CO. We are passionate about web and mobile app design. Our company prides itself on creating websites and apps that are elegant, original, and easy to use. In the fast developing tech world we stay at the top of our game and use the latest technologies—plus innovative thinking—to make a superior product!</h4></div></div></div></section>'),e.put("app/blog/blog.html","<coming-soon></coming-soon>"),e.put("app/main/main.html",'<section class="module module-gray" id="Home"><div class="row"><itechdom-carousel></itechdom-carousel></div></section><section id="Services" class="module module-gray"><div class="row"><div class="col-sm-12"><div class="module-header"><h2 class="module-title">Services</h2><h3 class="module-subtitle">What we do with love<span class="point">.</span></h3></div></div></div><services-grid></services-grid></section><section id="Portfolio" class="module pb-0"><div class="row"><div class="col-sm-6 col-sm-offset-3"><div class="module-header wow fadeInUp"><h2 class="module-title">Portfolio</h2><h3 class="module-subtitle">Some of our Work<span class="point">.</span></h3></div></div><portfolio-grid></portfolio-grid></div></section><section id="Contact" class="module-small module-gray"><div class="container"><div class="row"><contact-info></contact-info></div></div></section>'),e.put("components/comingSoon/comingSoon.html",'<section id="comingSoon" class="module module-gray"><div class="row"><div class="col-sm-12"><div class="module-header"><h2 class="module-title">Coming Soon ....</h2></div></div></div></section>'),e.put("components/carousel/carousel.html",'<carousel id="#itechdomCarousel" style="min-height:300px;background-color: black" interval="myInterval"><slide ng-repeat="slide in slides" active="slide.active"><img ng-src="assets/images/carousel/{{slide.image}}" style="margin:auto"><div class="carousel-caption"><p>{{slide.title}}</p></div></slide></carousel>'),e.put("components/contactInfo/contactInfo.html",'<div id="#contactInfo"><div class="col-md-12 contact-block"><h3>{{contact.text}}</h3><h3>Contact Us At:</h3></div><div class="col-sm-12 contact-block"><h3><a href="mailto:idea@itechdom.com">{{contact.email}}</a></h3></div></div>'),e.put("components/navbar/navbar.html",'<div pageslide="" ps-side="left" ps-speed="0.00005" ps-open="checked"><div class="container" style="background-color: white"><ul class="col-sm-12 nav nav-pills nav-stacked"><a ng-click="check()" role="button" class="closeMenu"><i class="fa fa-close"></i></a><li ng-click="check()" ng-repeat="item in leftMenu" class="page-scroll"><a id="scroll-{{item.title}}" href="{{item.url}}" ng-click="scrollTo()">{{item.title}}</a></li><li ng-click="check()" ng-repeat="item in rightMenu" class="page-scroll"><a id="scroll-{{item.title}}" href="{{item.url}}" ng-click="scrollTo()">{{item.title}}</a></li></ul></div></div><nav class="navbar navbar-custom navbar-fixed-top" role="navigation"><div class="container"><ul class="col-md-4 nav navbar-nav hidden-sm hidden-xs leftMenu"><li ng-repeat="item in leftMenu | reverse" class="page-scroll pull-right"><a id="scroll-{{item.title}}" href="{{item.url}}" ng-click="scrollTo()">{{item.title}}</a></li></ul><a class="navbar-btn visible-xs visible-sm pull-left col-sm-4 mobileMenu" ng-click="check()" role="button"><span class="fa fa-bars mobile-button"></span></a><div><a class="navbar-brand" href="#/home"><img width="150px" src="assets/images/itechdom.png"></a></div><ul class="col-md-4 nav navbar-nav hidden-sm hidden-xs rightMenu"><li ng-repeat="item in rightMenu" class="page-scroll pull-right"><a id="scroll-{{item.title}}" href="{{item.url}}" ng-click="scrollTo()">{{item.title}}</a></li></ul></div></nav>'),e.put("components/portfolioGrid/portfolioGrid.html",'<div class="container"></div><div id="#portfolioGrid" class="col-md-12 grid"><div ng-repeat="portfolio in portfolios" class="col-md-3 col-sm-12 col-xs-12 grid-item" data-groups="all slideshow image"><a href="{{portfolio.url}}" target="_blank" class="gallery" title="Caption"><div class="image-wrapper center-block"><div class="item-caption"><h2 class="caption-title">{{portfolio.title}}</h2></div><img class="thumbnail center-block" ng-src="assets/images/portfolio/{{portfolio.image}}" alt=""></div></a></div></div>'),e.put("components/servicesGrid/servicesGrid.html",'<div class="row"><div ng-repeat="service in services" class="col-md-6 col-sm-12"><div class="iconbox equal-height"><div class="iconbox-icon"><span class="fa fa-{{service.icon}}"></span></div><div class="iconbox-text"><h3 class="iconbox-title">{{service.title}}</h3><div class="iconbox-desc">{{service.description}}</div></div></div></div></div>')}]);