$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    let send = document.querySelector('.input_sub')
    let input_txt = document.querySelector('.input_txt')
    let talk_list = document.querySelector('.talk_list')

    send.addEventListener('click',function(){
        let text = input_txt.value.trim()
        // 用户输入为空 时
        if(text.length<=0){
            return input_txt.value = ''
        }
        // 输入不为空时 发送消息
        let li = document.createElement('li')
        li.classList.add('right_word')
        li.innerHTML = `
        <img src="img/person02.png" />
        <span>${input_txt.value}</span>
        
        `
        talk_list.appendChild(li)
        input_txt.value = ''
        resetui()
        getMsg(text)
    })

    input_txt.addEventListener('keyup',function(e){
        if(e.key === 'Enter'){
            send.click()
        }
    })


    function getMsg(text){
        alert(111)
        $.ajax({
            method:'GET',
            url:'http://ajax.frontend.itheima.net:3006/api/robot',
            data:{
                spoken : text,
            },
            success : function(res){
                console.log(res);
                if(res.message === 'success'){
                    let msg = res.data.info.text
                     // 输入不为空时 发送消息
                    let li = document.createElement('li')
                    li.classList.add('left_word')
                    li.innerHTML = `
                    <img src="img/person01.png" />
                    <span>${msg}</span>
                    
                    `
                    talk_list.appendChild(li)
                    resetui()
                    // 调用用语音函数
                    getVoice(msg)

                }else{
                    console.log('失败');
                }
            }
        })
    }


    function getVoice(text){
        $.ajax({
            method:'GET',
            url:'http://ajax.frontend.itheima.net:3006/api/synthesize',
            text:text,
            success: function(res){
                if(res.status === 200){
                    let audio = document.querySelector('audio')
                    audio.style.src = res.voiceUrl
                }
            }


        })


    }




  })