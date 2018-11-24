/*
 * 아라봇 - Arabot
 * By Computerpark
 *
 * ARtificial intelligence Automated roBOT
 *
 */
const scriptName = "ara.js";

const ara_version = "0.3.01-exp1";
var notilist=0;
function getweather(region) {

    try {


        if (region === "" || region === " ") {
            return getweather("서울");
        } else if (region === '전국') {
            return '전국 날씨입니다:\n' + Utils.getWebText("https://m.search.naver.com/search.naver?query=전국날씨").split("전국날씨</strong>")[1].split("<div class=\"wt_notice\">")[0].replace(/(<([^>]+)>)/g, "").trim().replace(/  /g, "").replace(/도씨/g, "℃");
        }

        var data = Utils.getWebText("http://203.171.176.112:5000/weather?region=" + region).replace(/(<([^>]+)>)/g, "").trim().replace(":", ":\n").trim().trim().replace("요", "요.").replace("\n ", "\n").replace(/   /g, "");


        return data;

    } catch (e) {
        Log.debug("[런타임] 날씨 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);

        //return "오류: FORE00001 : 날씨 정보를 가져올 수 없습니다!\n지역명이 잘못되었거나 문법에 오류가 있습니다.";
        return "오류: 봇 스크립트 런타임 오류가 발생했습니다:\n" + e + "\n관리자에게 보고해주세요.";


    }

}
function getmealwormversion(){

     return "0.2 r181122-experimental"
}

function gethangangtemp(){
var data = Utils.getWebText("http://hangang.dkserver.wo.tc").replace(/(<([^>]+)>)/g, "").trim();
var hangang =JSON.parse(data);
return "한강물 온도입니다:\n수온: "+hangang.temp + "℃" + "\n측정시각: "+ hangang.time+ "\n즐거운 시간되세요 :D";

}

function getmeal(schoolname, year, month, date) {

    try {
        if (schoolname === "" || schoolname === " ") {
            return "오류: 학교명을 지정해주세요.";
        }

        var data = Utils.getWebText("http://203.171.176.112:5000/meal?schoolname=" + schoolname + "&date=" + String(year) + String(month) + String(date)).replace(/(<([^>]+)>)/g, "").trim().replace(/   /g, "").trim().replace('다. ', '다.\n');

  
        //.replace("요","요.")

        return data;

    } catch (e) {
        Log.debug("[런타임] 급식 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);

        //return "오류: FORE00001 : 날씨 정보를 가져올 수 없습니다!\n지역명이 잘못되었거나 문법에 오류가 있습니다.";

        return "오류: 봇 스크립트 런타임 오류가 발생했습니다:\n" + e + "\n관리자에게 보고해주세요.";

    }

}






function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
  

if(msg.indexOf("비상정지") !==-1){
replier.reply("비상정지");
Api.off("ara.js");
}
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

    if (msg.indexOf("아라봇") !== -1) {
var notidate = new Date();
            var notimonth = notidate.getMonth() + 1;
            var notiday = notidate.getDate();
var notihour  =notidate.getHours();
var notimin=notidate.getMinutes();
var notisec=notidate.getSeconds();

Api.makeNoti(sender +"님이 "+ notiday + "일 "+notihour+ "시 "+ notimin + "분 "+notisec+ "초에 " +"아라봇을 호출함","방 이름: " + room+ " | 내용: '" + msg+"' | 패키지: " + packageName,notilist);
notilist++;
        if (msg.indexOf("안녕") !== -1 || msg.indexOf("하이") !== -1 || msg.indexOf("ㅎㅇ") !== -1 || msg.indexOf("ㅎ2") !== -1) {
            replier.reply(room, sender + " 님 안녕하세요!");
        } else if (msg.indexOf("디버그") !== -1 || msg.indexOf("정보") !== -1) {
            replier.reply(room, "아라봇 정보\n==================\n" + "ArA 엔진 " + ara_version + "\nmealworm 서버 " + getmealwormversion() + "\n안드로이드 버전 " +Device.getAndroidVersionName() + " API 버전 "+ Device.getAndroidVersionCode() + " on " +Device.getPhoneModel()+ "\nara-android 버전 " + Api.getContext()+ "\n요청 패키지명: " + packageName + "\nroom = " + room + "\nsender = " + sender + "\n단톡 = " + isGroupChat+ "\nnotilist = " + (notilist-1));
        } else if (msg.indexOf("도배") !== -1) {

            msg = msg.split('아라봇')[1].split('도배')[1];
            msg = msg.trim();
            try {
                msgtxt = msg.split('--')[0].trim();
                msgint = msg.split('--')[1].trim();

                if (msgtxt === "") {
                    replier.reply(room, "오류: 도배할 문자열이 지정되지 않았습니다");

                } else {
                    for (i = 0; i < msgint; i++) {
                        replier.reply(room, msgtxt);
                    }
                    replier.reply(room, '도배를 마쳤습니다.');
                }
            } catch (e) {
                replier.reply(room, "[경고]: 도배할 개수가 지정되지 않았습니다. 기본 50번으로 도배합니다.");
                if (msgtxt === "") {
                    replier.reply(room, "오류: 도배할 문자열이 지정되지 않았습니다");

                } else {
                    msgint = 50;
                    for (i = 0; i < msgint; i++) {
                        replier.reply(room, msgtxt);
                    }
                    replier.reply(room, '도배를 마쳤습니다.');
                }
            }

        } else if (msg.indexOf("도움말") !== -1) {

            replier.reply(room, "아라봇에 오신 것을 환영합니다!\n아래는 기능들 목록입니다.\n\n명령 리스트 ------------------------\n문법: '아라봇 {요청 명령}'\n\n명령 종류: \n1. 급식\n  - '아라봇 {날짜(옵션)} {학교} 급식'\n  - 학교는 아직 서울에 있슨 초/중/고등학교만 지원되며 날짜는 '어제', '오늘', '내일', '모래'만 지원됨.\n  - 날짜가 '오늘' 인 경우에는 생략 가능\n  - 버그: 다음달 내일 작동안함\n\n2. 날씨\n  - '아라봇 {지역} 날씨\n  - 네이버에서 크롤링\n  - 해외 날씨는 지원되지 않음\n  - 어제 오늘 내일 지원안됨\n\n3. 도배\n  - 문법이 좀 특이한데, '아라봇 도배 {string} --{int}' 로 호출\n\n4. 한강물 온도\n  - '아라봇 한강물온도' 로 호출\n  - 시험을 마친 수험생들에게 유용한 도구.\n  - '퐁당' 앱의 Api를 사용함.\n\n5. 도움말\n  - 여러분이 지금 보고있는 이것\n  - '아라봇 도움말 날씨' <- 이렇게 호출이 가능하게 만들고있음\n\n6. 디버그 / 정보\n  - '아라봇 디버그' / '아라봇 정보' 로 호출\n\n---------------------------------------------\n곧 더 많은 기능이 찾아옵니다!\n"); //TODO:도움말
        }else if (msg.indexOf("한강") !== -1) {

            replier.reply(room, gethangangtemp()); //TODO: 수능일정
        }


 else if (msg.indexOf("날씨") !== -1) {
            replier.reply(room, '날씨 정보를 가져오는 중입니다...');
            msg = msg.split('아라봇')[1].split('날씨')[0];
            msg = msg.trim();

msg = msg.replace("오늘", "").trim();      //TODO: 오늘 내일 모래
            Log.debug(msg);
            weathertmp = getweather(msg);
            replier.reply(room, weathertmp);
        } else if (msg.indexOf("급식") !== -1) {
            replier.reply(room, '급식을 가져오는 중입니다...');
            msg = msg.split('아라봇')[1].split('급식')[0];
            msg = msg.trim();
            var dt = new Date();
            var month = dt.getMonth() + 1;
            var day = dt.getDate();
            var year = dt.getFullYear();
if (msg.indexOf("모래") !== -1) {
                msg = msg.replace("모래", "").trim();
                day = day + 2;
msg = msg.replace("내일", "").trim();
            }
          else if (msg.indexOf("내일") !== -1) {
                msg = msg.replace("내일", "").trim();
                day = day + 1;
            }else if (msg.indexOf("어제") !== -1) {
                msg = msg.replace("어제", "").trim();
                day = day - 1;
            }



msg = msg.replace("오늘", "").trim();
            Log.debug(msg);
            mealtmp = getmeal(msg, year, month, day);
            if (mealtmp.indexOf("오류") !== 1) {
                replier.reply(room, mealtmp);
            } else {
                replier.reply(room, mealtmp);
            }
        } else if (msg.trim() === "아라봇") {
            replier.reply(room, "네, " + sender + "님.");
        } else {
            replier.reply(room, "죄송합니다, 명령을 해석할 수 없습니다.\n'아라봇 도움말' 로 사용 가능한 명령을 찾아보세요!");
        }
    }


}

function onStartCompile() {
    /*컴파일 또는 Api.reload호출시, 컴파일 되기 이전에 호출되는 함수입니다.
     *제안하는 용도: 리로드시 자동 백업*/

}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
    var layout = new android.widget.LinearLayout(activity);
    layout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
    var txt = new android.widget.TextView(activity);
    txt.setText("왜 들어갔니?");
    layout.addView(txt);
    activity.setContentView(layout);
}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}