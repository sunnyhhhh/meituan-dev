import '../css/reset.css';
import '../webfont/iconfont.css'
import '../plug/css/swiper.min.css';
import '../css/meituanIndex.css';

$(window).on('scroll', function(){
	let top = $(window).scrollTop();
	if(top >= 500){
		$('#gotop').slideDown();
	}else{
		$('#gotop').slideUp();
	}
});

getData();

$('#gotop').on('click', function(){
	$('html, body').animate({
		scrollTop: 0
	});
})

function getData(){
	let url = 'http://localhost:8080/api/list.json';
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'json',
		success: addList,
		error:function(){
			console.log('error');
		}
	})
}

function addList(data){
	let str = ``;
	data.list.forEach(function(item, index){
		str += `<li class="foodspic">
		<a href="http://localhost:8080/meituan-detail.html?id=${item.id}" class="clearfix">
			<img src="${item.info.imgurl}" alt="">
			<dl>
				<dt>${item.info.name}</dt>
				<dd>
					<p class="foodtitle">${item.info.des}</p>
					<p class="price">
						<span><strong>${item.info.price}</strong><i>元</i></span>
						<span>${item.info.newUser}</span>
						<span>${item.info.sale}</span>
					</p>
				</dd>
			</dl>
		</a>
	</li>`
	});
	$('.guess-foodlist .list').html(str);
}