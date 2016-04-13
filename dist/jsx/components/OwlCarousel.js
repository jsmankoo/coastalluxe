'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* http://owlgraphic.com/owlcarousel/demos/one.html
*
* Props
*		items: number. This variable allows you to set the maximum amount of items displayed at a time with the widest browser width
*		itemsDesktop: array. This allows you to preset the number of slides visible with a particular browser width.
*	              The format is [x,y] whereby x=browser width and y=number of slides displayed.
*	              For example [1199,4] means that if(window<=1199){ show 4 slides per page}
*	              Alternatively use itemsDesktop: false to override these settings.
*		itemsDesktopSmall: array. As above.
*		itemsTablet: array. As above.
*		itemsTabletSmall: array. As above. Default value is disabled.
*		itemsMobile: array. As above.
*		itemsCustom: array.	This allow you to add custom variations of items depending from the width
*	             If this option is set, itemsDeskop, itemsDesktopSmall, itemsTablet, itemsMobile etc. are disabled
*	             For better preview, order the arrays by screen size, but it's not mandatory
*	             Don't forget to include the lowest available screen size, otherwise it will take the default one for screens lower than lowest available.
*	             Example: [[0, 2], [400, 4], [700, 6], [1000, 8], [1200, 10], [1600, 16]]
*		singleItem : ,
*		itemsScaleUp: boolean. Option to not stretch items when it is less than the supplied items.
*		slideSpeed: number. Slide speed in milliseconds.
*		paginationSpeed: number. Pagination speed in milliseconds.
*		rewindNav: boolean. Slide to first item. Use rewindSpeed to change animation speed.
*		rewindSpeed: number. Rewind speed in milliseconds.
*		autoPlay: boolean. Change to any integrer for example autoPlay : 5000 to play every 5 seconds.
*	          If you set autoPlay: true default speed will be 5 seconds.
*		stopOnHover: boolean. Stop autoplay on mouse hover.
*		navigation: boolean. Display "next" and "prev" buttons.
*		navigationText: array of element | boolean. You can customize your own navigation.
*	                To get empty buttons use navigationText : false. Also HTML can be used here.
*		scrollPerPage: boolean. Scroll per page not per item. This affect next/prev buttons and mouse/touch dragging.
*		pagination: boolean. Show pagination.
*		paginationNumbers: boolean. Show numbers inside pagination buttons
*		responsive: boolean. Change that to "false" to disable resposive capabilities
*		responsiveRefreshRate: number. Check window width changes every 200ms for responsive actions
*		responsiveBaseWidth: jQuery selector. Owl Carousel check window for browser width changes.
*		baseClass: string. Automaticly added class for base CSS styles.
*		theme: string. Default Owl CSS styles for navigation and buttons. Change it to match your own theme.
*		lazyLoad: boolean. Delays loading of images. Images outside of viewport won't be loaded before user scrolls to them.
*	          Great for mobile devices to speed up page loadings. IMG need special markup class="lazyOwl" and data-src="your img path".
*		lazyFollow: boolean. When pagination used, it skips loading the images from pages that got skipped.
*	            It only loads the images that get displayed in viewport.
*	            If set to false, all images get loaded when pagination used. It is a sub setting of the lazy load function.
*		lazyEffect: boolean / one of "fade", , Default is fadeIn on 400ms speed. Use false to remove that effect.
*		autoHeight: boolean. Add height to owl-wrapper-outer so you can use diffrent heights on slides. Use it only for one item per page setting.
*		jsonPath: string. Allows you to load directly from a jSon file.
*	          The JSON structure you use needs to match the owl JSON structure used here. To use custom JSON structure see jsonSuccess option.
*		jsonSuccess: function. Success callback for $.getJSON build in into carousel.
*		dragBeforeAnimFinish: boolean. Ignore whether a transition is done or not (only dragging).
*		mouseDrag: boolean. Turn off/on mouse events.
*		touchDrag: boolean. Turn off/on touch events.
*		addClassActive: boolean. Add "active" classes on visible items. Works with any numbers of items on screen.
*		transitionStyle: string. Add CSS3 transition style. Works only with one item on screen.
*
* Method
*		next()
*		prev()
*		goTo(x)
*		jumpTo(x)
*		play()
*		stop()
*/

var OwlCarousel = _react2.default.createClass({
	displayName: 'OwlCarousel',
	getDefaultProps: function getDefaultProps() {
		return {
			options: {},
			style: {}
		};
	},


	propTypes: {
		children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.element.isRequired)]).isRequired,

		style: _react2.default.PropTypes.object,
		id: _react2.default.PropTypes.string,
		options: _react2.default.PropTypes.shape({

			items: _react2.default.PropTypes.number,
			itemsCustom: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number).isRequired),
			itemsDesktop: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number.isRequired),
			itemsDesktopSmall: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number.isRequired),
			itemsTablet: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number.isRequired),
			itemsTabletSmall: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number.isRequired),
			itemsMobile: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number.isRequired),
			singleItem: _react2.default.PropTypes.bool,
			itemsScaleUp: _react2.default.PropTypes.bool,

			slideSpeed: _react2.default.PropTypes.number,
			paginationSpeed: _react2.default.PropTypes.number,
			rewindSpeed: _react2.default.PropTypes.number,

			autoPlay: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.number]),
			stopOnHover: _react2.default.PropTypes.bool,

			navigation: _react2.default.PropTypes.bool,
			navigationText: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
			rewindNav: _react2.default.PropTypes.bool,
			scrollPerPage: _react2.default.PropTypes.bool,

			pagination: _react2.default.PropTypes.bool,
			paginationNumbers: _react2.default.PropTypes.bool,

			responsive: _react2.default.PropTypes.bool,
			responsiveRefreshRate: _react2.default.PropTypes.number,
			responsiveBaseWidth: function responsiveBaseWidth(props, propName, componentName) {
				if (props[propName] && !$(props[propName]).length) {
					return new Error('React-owl-carousel: the props `responsiveBaseWidth` needs jQuery selector.');
				}
			},

			baseClass: _react2.default.PropTypes.string,
			theme: _react2.default.PropTypes.string,

			lazyLoad: _react2.default.PropTypes.bool,
			lazyFollow: _react2.default.PropTypes.bool,
			lazyEffect: _react2.default.PropTypes.bool,

			autoHeight: _react2.default.PropTypes.bool,

			jsonPath: _react2.default.PropTypes.string,
			jsonSuccess: _react2.default.PropTypes.func,

			dragBeforeAnimFinish: _react2.default.PropTypes.bool,
			mouseDrag: _react2.default.PropTypes.bool,
			touchDrag: _react2.default.PropTypes.bool,

			addClassActive: _react2.default.PropTypes.bool,

			//build-in transitionStyle: 'fade', 'backSlide', 'goDown', 'scaleUp'
			transitionStyle: _react2.default.PropTypes.string,

			beforeUpdate: _react2.default.PropTypes.func,
			afterUpdate: _react2.default.PropTypes.func,
			beforeInit: _react2.default.PropTypes.func,
			afterInit: _react2.default.PropTypes.func,
			beforeMove: _react2.default.PropTypes.func,
			afterMove: _react2.default.PropTypes.func,
			afterAction: _react2.default.PropTypes.func,
			startDragging: _react2.default.PropTypes.func,
			afterLazyLoad: _react2.default.PropTypes.func
		})
	},

	componentDidMount: function componentDidMount() {
		$(_react2.default.findDOMNode(this)).owlCarousel(this.props.options);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		$(_react2.default.findDOMNode(this)).data('owlCarousel').destroy();
	},
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		$(_react2.default.findDOMNode(this)).owlCarousel(this.props.options);
	},
	componentWillUnmount: function componentWillUnmount() {
		$(_react2.default.findDOMNode(this)).data('owlCarousel').destroy();
	},
	render: function render() {

		// this.props.options.touchDrag !== false
		// 	?	React.initializeTouchEvents(true)
		// 	: React.initializeTouchEvents(false);

		return _react2.default.createElement(
			'div',
			{ id: this.props.id, style: this.props.style },
			this.props.children
		);
	},
	next: function next() {
		$(_react2.default.findDOMNode(this)).data('owlCarousel').next();
	},
	prev: function prev() {
		$(_react2.default.findDOMNode(this)).data('owlCarousel').prev();
	},


	// Go to x slide
	goTo: function goTo(x) {
		$(_react2.default.findDOMNode(this)).data('owlCarousel').goTo(x);
	},


	// Go to x slide without slide animation
	jumpTo: function jumpTo(x) {
		$(_react2.default.findDOMNode(this)).data('owlCarousel').jumpTo(x);
	},
	play: function play() {
		$(_react2.default.findDOMNode(this)).data('owlCarousel').play();
	},
	stop: function stop() {
		$(_react2.default.findDOMNode(this)).data('owlCarousel').stop();
	}
});

module.exports = OwlCarousel;