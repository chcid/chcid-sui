function menuClick(id) {
	$("#menuUl > li").removeClass("active");
	$("#li" + id).addClass("active");
}
/*
 * $(document).ready(function() {
 * $('[data-toggle="confirmation-popout"]').confirmation({ popout : true });
 * $('#delete').confirmation({ popout : true }); });
 */

/*
 * !function($) {
 * 
 * $(function() {
 * 
 * $('[data-toggle="confirmation"]').confirmation();
 * $('[data-toggle="confirmation-singleton"]').confirmation({ singleton : true
 * }); $('[data-toggle="confirmation-popout"]').confirmation({ popout : true });
 * alert("hi");
 *  })
 * 
 * }(window.jQuery)
 */