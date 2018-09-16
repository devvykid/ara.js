/*
* 아라봇 - Arabot
* By Computerpark
*
* ARtificial intelligence Automated roBOT
*
*/

const scriptName="ara.js";

const version= "0.1.0";

function getweather(region) {

    try {

        var data = Utils.getWebText("https://m.search.naver.com/search.naver?query=" + region + "+날씨");
        // data = data.split('<span class="ico_status ws7"><span class="u_hc">')[1]

        for (var i=0;i<13;i++){
            data =data.replace('</em>', "℃");
        }


        data = data.split('div class="wt_img">')[1];
        data =data.split('풍속</strong>')[0];
        data = data.replace('</em>', "℃ ").replace(/(<([^>]+)>)/g, "").trim().replace(/  /g,"").replace("\n\n","\n");

        for (var i=0;i<6;i++){
            data = data.replace(/  /g,"");
        }

        for (var i=0;i<6;i++){
            data = data.replace('\n\n',"\n");
        }

        data = data.replace(/\n\n/g,"\n");
//.split("<span class=\"date\">")[0].split("특보")[0];
        //   data = data.trim().replace(/ /g, "").replace(/em /g, "℃ ").replace(/ /g, ", ").replace('\n\n',"");

        return region + '의 날씨입니다:\n' + data;

    } catch (e) {
        if (region ==="" || region===" ") {
            return getweather("서울");
        }
        else if (region==='전국'){
            return '전국 날씨입니다:\n' + Utils.getWebText("https://m.search.naver.com/search.naver?query=전국날씨").split("전국날씨</strong>")[1].split("<div class=\"wt_notice\">")[0].replace(/(<([^>]+)>)/g, "").trim().replace(/  /g,"").replace(/도씨/g, "℃");
        }


        Log.debug("날씨 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);

        return "오류: FORE00001 : 날씨 정보를 가져올 수 없습니다!\n지역명이 잘못되었거나 문법에 오류가 있습니다.";

        return "오류: 해당 지역의 날씨 정보를 불러올 수 없습니다.";




    }

}




function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    /*(이 내용은 길잡이일 뿐이니 지우셔도 무방합니다)
     *(String) room: 메시지를 받은 방 이름
     *(String) msg: 메시지 내용
     *(String) sender: 전송자 닉네임
     *(boolean) isGroupChat: 단체/오픈채팅 여부
     *replier: 응답용 객체. replier.reply("메시지") 또는 replier.reply("방이름","메시지")로 전송
    *(String) ImageDB.getProfileImage(): 전송자의 프로필 이미지를 Base64로 인코딩하여 반환
     *(String) packageName: 메시지를 받은 메신저의 패키지 이름. (카카오톡: com.kakao.talk, 페메: com.facebook.orca, 라인: jp.naver.line.android
     *(int) threadId: 현재 쓰레드의 순번(스크립트별로 따로 매김)     *Api,Utils객체에 대해서는 설정의 도움말 참조
     */

    if(msg.indexOf("아라봇") !==-1){
        if(msg.indexOf("안녕") !==-1 || msg.indexOf("하이") !==-1 || msg.indexOf("ㅎㅇ") !==-1 || msg.indexOf("ㅎ2") !==-1){
            replier.reply(room, sender + " 님 안녕하세요!");
        }
        else if(msg.indexOf("디버그") !== -1){
            replier.reply(room, "아라봇 디버그 정보\n==================\n" + "ArA 엔진 "+version+"\n요청 패키지명: "+ packageName + "\nroom =" + room+ "\nsender =" + sender+ "\n단톡 =" + isGroupChat + "\nthread id =" + threadId);
        }
        else if(msg.indexOf("날씨")!== -1){
            replier.reply(room, '날씨 정보를 가져오는 중입니다...');
            msg = msg.split('아라봇')[1].split('날씨')[0];
            msg = msg.trim();
            Log.debug(msg);
            weathertmp =getweather(msg);
            replier.reply(room, weathertmp);
        }
        else{
            replier.reply(room, "안녕하세요! AraBot입니다!");
        }

    }

    function onStartCompile(){
        /*컴파일 또는 Api.reload호출시, 컴파일 되기 이전에 호출되는 함수입니다.
         *제안하는 용도: 리로드시 자동 백업*/

    }

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
    function onCreate(savedInstanceState,activity) {
        var layout=new android.widget.LinearLayout(activity);
        layout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
        var txt=new android.widget.TextView(activity);
        txt.setText("액티비티 사용 예시입니다.");
        layout.addView(txt);
        activity.setContentView(layout);
    }
    function onResume(activity) {}
    function onPause(activity) {}
    function onStop(activity) {}


}
