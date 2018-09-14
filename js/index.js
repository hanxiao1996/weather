
$(function(){
	let citys
	$.ajax({
		url: 'https://www.toutiao.com/stream/widget/local_weather/city/',
		type: 'get',
		dataType:"jsonp",
		success:function(e){
			citys=e.data;
			let str="";
			for(key in citys){
				str+=`<div class="name">${key}</div>`
				str+=`<ul>`
				for(key1 in citys[key]){
					str+=`<li class="city">${key1}</li>`
				}
				str+=`</ul>`
			}
			$(str).appendTo($(".footer"));
		}
	})
	let alert=$(".cityBox")
	let xl=$(".header")
	xl.click(function(){
		alert.slideDown();
	})
	let qx=$(".cityBox .header1 span")
	qx.click(function(){
		alert.slideUp();
	})
	let footer=$(".footer")
 // 点击下面的城市，弹框收起
 footer.on("touchstart",function(event){
 	if(event.target.className=="city")
 	{
 		alert.slideUp();
 		let citys=event.target.innerHTML;
 		
 		$.ajax({
 			
 			url:'https://www.toutiao.com/stream/widget/local_weather/data/',
 			data:{"city":citys},
 			type:"get",
 			dataType:"jsonp",
 			success:function(e){
 				update(e.data);
 				console.log(x)(e.data.weather)
 			}
      
 		})	
 	}
 }) 
    $.ajax({
            
            url:'https://www.toutiao.com/stream/widget/local_weather/data/',
            data:{"city":"太原"},
            type:"get",
            dataType:"jsonp",
            success:function(e){
                update(e.data);
                // console.dir(e.data.weather)
            }

        })  
 function update(data){
 	$(".header span").text(data.city);
 	$("#aqi").text(data.weather.aqi);
 	$("#quality_level").text(data.weather.quality_level);
 	$("#current_temperature").text(data.weather.current_temperature);
 	$("#dat_condition").text(data.weather.dat_condition);
 	$("#wind_direction").text(data.weather.wind_direction);
 	$("#wind_level").text(data.weather.wind_level);
//语音播报
$(".audioBtn").click(function(event){
    event.stopPropagation();
    let speech=window.speechSynthesis
    let speechset=new SpeechSynthesisUtterance()
    let text=$(".header span").text()+"当前气温"+$("#current_temperature").text()+"摄氏度"+$("#dat_condition").text()+"空气指数"+$("#aqi").text()+"空气状况"
    +$("#quality_level").text()
    speechset.text=text;

    speech.speak(speechset);
})
    // week部分的数据更新
    let str1=""; 
    let x=[];
    let high=[];
    let low=[];
    let con=$(".week ul")
    let weeknum=["日","一","二","三","四","五","六"]
    for(obj of data.weather.forecast_list){
    	let date=new Date(obj.date)
    	let day= date.getDay()  //星期几  0,1,2,3
    	x.push(date);
        let date1=obj.date.slice(5,10)
    	high.push(obj.high_temperature)
    	low.push(obj.low_temperature)
    	str1+=`
    	<li> 
    	<p class="day1">星期${weeknum[day]}</p>
    	<p class="date">${date1}</p>
    	<div class="daytime">
    	<p class="weather">${obj.condition}</p>
    	<img src="img/${obj.weather_icon_id}.png" alt="">
        </div>
    	<div class="night">
    	<p class="weather">${obj.condition}</p>
    	<img src="img/${obj.weather_icon_id}.png" alt="">
    	</div>
    	<p class="wind">${obj.wind_direction}</p>
    	<p class="wind">${obj.wind_level}级</p>
    	</li>
    	`
    }
    con.html(str1)
    let hours=$(".con")
    let str2=""
    for(obj of data.weather.hourly_forecast){
         str2+=`<div class="box">
                <div><span>${obj.hour}</span>:00</div>
                <img src="img/${obj.weather_icon_id}.png" alt="">
                <div><span>${obj.temperature}</span>°</div>
            </div>`
    }
    hours.html(str2)
// 制作折线图
 // 基于准备好的dom，初始化echarts实例
 var myChart = echarts.init($(".canvas")[0]);

        // 指定图表的配置项和数据
        var option = {
        	xAxis: {
        		show:false,
        		data:x
        	},
            grid: [
              { left:0,
              }
              ],
        	yAxis: {
        		show:false,
        	},
        	series: [{

        		name: '销量',
        		type: 'line',
        		data:high

        	},{
        		name: '销量',
        		type: 'line',
        		data:low
        	}]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);




    }


})
