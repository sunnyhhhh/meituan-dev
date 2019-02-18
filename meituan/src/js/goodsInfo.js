// 解析URL 拿到id 筛选信息 定位数据 渲染页面
import '../css/reset.css';
import '../webfont/iconfont.css'
import '../plug/css/swiper.min.css';
import '../css/meituanDetail.css';

let curId = window.location.search.slice(4);

getData();

function getData(){
	let url = 'http://localhost:8080/api/list.json';
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'json',
		success: getIdData,
		error:function(){
			console.log('error');
		}
	})
}

function getIdData(data){
    for(let i = 0; i < data.list.length; i++){
        if(data.list[i].id == curId){
            // console.log(data.list[i])
            addDom(data.list[i]);
            return;
        }
    }
}

function addDom(dataList){
    var str = ``;
    var info = dataList.info;
    $('.bigimg').find('img').attr('src', info.imgurl);
    $('.bigimg').find('.name').text(info.name);
    $('.bigimg').find('.des').text(info.des);
    $('.price-box .price').find('strong').text(info.price);
    $('.seller .address').find('h4').text(info.receive);
    $('.seller .address').find('p').text(info.adderess);
    var comment = dataList.info.comment;
    comment.forEach(function (ele, index) {
        str += `<li class="item-evaluate"><div class="foot-user clearfix">\
            <img src="${ele.pic}" alt=""><div class="user-strart">\
                <h5>${ele.user}</h5></div>\
            <p class="evaluate-date">${ele.date}</p></div>\
        <div class="evaluate-content"><p>${ele.content}</p>\
            <p><span><img src="${ele.img}" alt=""></span></p>\
        </div><div class="locale"><a href="###">${info.receive}</a></div></li>`;
    })
    $('.food-evaluate').find('ul').html(str);
}