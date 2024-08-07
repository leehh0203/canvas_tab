function ColorsTop(){
  const tabbuttonWrap = document.querySelector(".tab-btn")
  const tabListItem = document.querySelectorAll(".tab-btn button"); 
  const tabContent = document.querySelector(".tab-cont");
  const tabImg = document.querySelectorAll(".tab-img");
  
  //탭
  tabListItem.forEach((item, index) => {  
    item.addEventListener('click', function (e) {
      let selectColor = e.currentTarget.getAttribute('data-color')

      //버튼 액티브
      tabListItem.forEach((chips, i) => {
        tabbuttonWrap.setAttribute('data-colorchips', selectColor)
        chips.setAttribute("aria-selected", "false");
      });
      e.currentTarget.setAttribute("aria-selected", "true");
      
      //이미지
      tabImg.forEach((tabImgItem,i) => {
        let Img = tabImgItem.querySelector('img');
        let ImgWrap = tabImgItem.querySelector('picture');
        let NewImg = Img.cloneNode(true);

        NewImg.classList.add('new-img');
        ImgWrap.appendChild(NewImg);

        setTimeout(function () {
            NewImg.classList.add('active')
        
                setTimeout(function () {
                  NewImg.remove()
                }, 2000);

        },100);

      //이미지 교체
      const artText = `${selectColor}-Text1, ${selectColor}-Text2, ${selectColor}-Text3`;
      Img.src = `./images/tab_img/galaxy-z-flip5-highlights-colors-${selectColor}-0${i+1}.jpg`
      Img.alt = artText

      })

    });
  
  });

  //이미지 액션

  tabImg.forEach((item, index) => {

    item.addEventListener('click', function(e){
      const hasOn = e.currentTarget 

      //타겟값 가져오기 타겟안에 on이 없다면 나머지 애들한테 remove해주고 타켓에 on을 넣어줌
      if(!hasOn.classList.contains('on')){ 
          tabImg.forEach((sibling) => {
          sibling.classList.remove("on");
        });  
      }
      hasOn.classList.add('on')

      const LeftBottom = tabContent.querySelector(".left.bottom")
      const RightTop = tabContent.querySelector(".right.top")
      const LeftTop = tabContent.querySelector(".left.top")
      const RightBottom = tabContent.querySelector(".right.bottom")


      // 'top' 'left' (완)
      if (item.classList.contains("left") && item.classList.contains('top')) { 
        LeftBottom.classList.remove("left");
        LeftBottom.classList.add("right");

        
      }
      // 'left' 'bottom' 
      if (item.classList.contains("left") && item.classList.contains('bottom')) {
        RightTop.classList.remove("top");
        RightTop.classList.add("bottom");
        LeftTop.classList.remove("left");
        LeftTop.classList.add("right");
      }
      // 'top' 'right' (완)
      if (item.classList.contains("right") && item.classList.contains('top')) {
        RightBottom.classList.remove("right")
        RightBottom.classList.add("left");
      }

      // 'right' 'bottom' 
      if (item.classList.contains("right") && item.classList.contains('bottom')) {
        LeftTop.classList.remove("top");
        LeftTop.classList.add("bottom");
        
        RightTop.classList.remove("right");
        RightTop.classList.add("left");
      }
      
      if (item.classList.contains('bottom')) {
          setTimeout(() => {
            item.classList.remove('bottom');
            item.classList.add('top');
          }, 100);
      }

    })
    
  })
}


//캔버스 0
const canVas = document.querySelector('#video-canvas-0')
const canVasDraw = canVas.getContext('2d')
const WindowHeight = window.innerHeight; //보고 있는 창의 높이
let ImgElem;
let ImgArr = []

const canVas2 = document.querySelector('#video-canvas-1')
const canVasDraw2 = canVas2.getContext('2d')
const WindowHeight2 = window.innerHeight; //보고 있는 창의 높이
let ImgElem2;
let ImgArr2 = []


function NewCanvas(){
  //캔버스 00
    for (let i = 0; i < 29; i++){
      ImgElem = new Image();
      ImgElem.src = `./images/canvas_00/galaxy-z-fold2_highlights_shooting_${i}.jpg`;
      ImgArr.push(ImgElem);
    }
    ImgArr[0].onload = () => {
      canVasDraw.drawImage(ImgArr[0], 0, 0);
    }

  //캔버스 01
  for (let count = 0; count < 221; count++){
    let currentVal = count.toString().padStart(3, '0');
    ImgElem2 = new Image();
    ImgElem2.src = `./images/canvas_01/galaxy-z-fold2_highlights_continuity_${currentVal}.jpg`;
    
    ImgArr2.push(ImgElem2);
  }
    ImgArr2[0].onload = function() {
    canVasDraw2.drawImage(ImgArr2[0], 0, 0)
  }



}
function ScrollAnimation(){

    //scroll-section-1 
    //캔버스 스크롤에 적용하기
    const ContWrap = document.querySelector('#scroll-section-1'); 
    const TotalHeight = ContWrap.getBoundingClientRect().height;
    const ContWrapInfo = ContWrap.getBoundingClientRect();
    
    //섹션 안에서 액티브
    // (ContWrapInfo.top < WindowHeight && ContWrapInfo.bottom > 0)
    if (ContWrapInfo.top < WindowHeight && ContWrapInfo.bottom > WindowHeight) {
      const progress = Math.min(1, Math.max(0, ( - ContWrapInfo.top) / (TotalHeight - WindowHeight) ))
      const ImageIndex = Math.floor(progress * (ImgArr.length - 1));
      canVasDraw.drawImage(ImgArr[ImageIndex], 0, 0)
    }

    //스크롤 이벤트
    const ContWrap2 = document.querySelector('#scroll-section-2');  
    const ContWrap2Info = ContWrap2.getBoundingClientRect();  
    const moveArea = ContWrap2Info.height - WindowHeight 
    const scrollTop =  -ContWrap2Info.top; 
    const percent = (Math.min(1, Math.max(0, (scrollTop)/moveArea))) 

    if (ContWrap2Info.top < WindowHeight && ContWrap2Info.bottom > WindowHeight) {
      const ImageIndex = Math.floor(percent * (ImgArr2.length - 1));
      canVasDraw2.drawImage(ImgArr2[ImageIndex], 0, 0)
    }

    
    //scroll-section_02 animation구간
    const step2Text = document.querySelector('#step2_text')
    const step2Percent = Math.min(1, Math.max(0, (scrollTop - (0.4 * moveArea)))/((0.42 * moveArea) -(0.4 * moveArea)))
    const step2Revers = 1 - step2Percent;

    const step3Text = document.querySelector('#step3_text')
    const step3Percent = Math.min(1, Math.max(0, (scrollTop - (0.41 * moveArea)))/((0.46 * moveArea) -(0.41 * moveArea)))
    const step3Revers = 1 - step3Percent;

    if (percent > 0 && ContWrap2Info.bottom > 0) {
      step2Text.style.opacity = step2Revers;
      step2Text.style.transform = `translateY(${-step2Percent * 20}px)`

      step3Text.style.opacity = step3Percent;
      step3Text.style.transform = `translateY(${-step3Percent * 20}px)`
    }
};

window.addEventListener('load', function(){
  ColorsTop();
  NewCanvas()
});
window.addEventListener('scroll', function (){
  ScrollAnimation();
})


