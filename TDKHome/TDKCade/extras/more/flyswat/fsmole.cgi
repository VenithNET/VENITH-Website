<HTML><HEAD>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=x-sjis">
<TITLE>���n�G�����L���O��</TITLE>
<SCRIPT LANGUAGE="JavaScript">
<!-----
//================================================================
// Flash-MoleHit Version 1.3
//		Programmed by Jynichi Sakai(�����ہ[)
// E-Mail: caa95880@pop06.odn.ne.jp  Homepage: http://appoh.system.to/
//================================================================
var timeID=0;
var time = 0;
var point=0;

animeImage = new Array(4);
for(var i = 0; i <= animeImage.length-1; i++) {
   animeImage[i] = new Image();
   animeImage[i].src="./hae"+ i +".gif";
}

var imghit = new Image();
imghit.src = "./hae"+4+".gif";
pat = new Array(0,1,2,3,2,1);

current = new Array(15);
for(i = 0; i < current.length-1; i++){
    current[i] = 0;
}

function init() {
   clearTimeout(timeID);
   point=0;
   sethit=0;
   setmiss=0;
   time=(30+1)*3;
   document.form1.remainTime.value = time;
   disp();
   for(var i = 0; i < current.length-1; i++) {
      current[i] = 0;
      document.images["mole"+i].src = animeImage[0].src;
   }
   run();
}

function run() {
   time--;
   document.form1.remainTime.value = parseInt(time/3);
   if(time <= 0) {
      gameover();
      return;
   }
   timeID = setTimeout("run()", 1000/3);
   for(var i = 0; i < current.length-1; i++) {
      if((current[i] == 0 && Math.random()*1000 < 100 - time/3) || current[i] != 0) {
         if((++current[i]) > 5) {
            current[i] = 0;
            setmiss++;
            point -= 1;
        	disp();
         }
         document.images["mole"+i].src = animeImage[pat[current[i]]].src;
      }
   }
}

function tap(n) {
   if(time == 0 || current[n] == -1) return;
   if(pat[current[n]] == 0) {
      point -= 2;
      setmiss++;
      disp();
   } else{
     sethit++;
     point += 10;
     disp();
     document.images["mole"+n].src = imghit.src;
     current[n] = -1;
   }
}

function disp(){
     document.form1.yourPoint.value=point;
     document.form1.hit.value=sethit;
     document.form1.miss.value=setmiss;
}

function gameover() {
     time = 0;
     clearTimeout(timeID);
     var mes="GAME OVER!  ���Ȃ��̃X�R�A�� " + point + " �_�ł��B";
     if      (point< 100) mes+="�X�C�J�̓n�G�ɂ��΂��Ă��܂��܂����c";
     else if (point< 200) mes+="�������I���Ƃ����ۂł����c";
     else if (point< 300) mes+="�ǂ��ɂ��Z�[�t�c���ȁH";
     else if (point< 400) mes+="�X�C�J���܂��肫��܂����I";
     else if (point< 500) mes+="�������I�X�p�C�_�[�}�����x���ł�!!";
     else                 mes+="���݂����n�G�����L���O��!!";
     alert(mes);
     document.form1.Point.value = point;
}
// ----->
</SCRIPT>
</HEAD>
<body bgcolor=#ffffff text=#000000 link=#0066cc vlink=#004080 alink=#FF8080>
<CENTER></CENTER>
<BASEFONT SIZE=3 FACE="�l�r �S�V�b�N">
<A HREF="http://www.ota.ed.jp/yabunan/quiz.htm">��ԂȂ�L�b�Y�ɂ��ǂ�</A>
<CENTER><IMG src="http://www.ota.ed.jp/yabunan/cgi/hae/haetata.gif" border="0" title="�n�G�����L���O"></CENTER>
<P>
<CENTER>
<TABLE style="border:1px solid #0066cc;" cellpadding="2"><tr><td>
<font color=#000000 size=3><center><b>���˖��Y�� �g���ʃX�C�J�� �n�G�� �˂���Ă��܂��I<br>
�n�G���������� �X�C�J�� �܂��낤!!</b></center>
</font>
</td></tr></table><br>
<FORM NAME="form1" METHOD="POST" ACTION="fsmole.cgi">
<INPUT TYPE="button" NAME="start" VALUE="   �X�^�[�g   " onClick="init()" style="background-color:#ff69b4;font-weight: 600;"><br><P>
<font color=#000000><B>�̂��肶����F</B><INPUT TYPE="text" NAME="remainTime"  VALUE=30 SIZE=4 style="border-color:#FFA500;border-width:3px;border-style:double;background:#ffff99;color:#000000;">
<B>�Ƃ��Ă�F</B><INPUT TYPE="text" NAME="yourPoint" VALUE="0" VALUE="yourPoint" SIZE=4 style="border-color:#FFA500;border-width:3px;border-style:double;background:#ffff99;color:#000000;">
<B>�q�b�g�F</B><INPUT TYPE="text" NAME="hit" VALUE="0" SIZE=4 style="border-color:#FFA500;border-width:3px;border-style:double;background:#ffff99;color:#000000;">
<B>�~�X�F</B><INPUT TYPE="text" NAME="miss" VALUE="0" SIZE=4 style="border-color:#FFA500;border-width:3px;border-style:double;background:#ffff99;color:#000000;"></font>
<P><TABLE BORDER="10"><TR>
<SCRIPT LANGUAGE="JavaScript">
<!---------
brVersion = navigator.appVersion.charAt(0);
brName = navigator.appName.charAt(0);
if(brVersion >=4){
    document.write("<TD background=suika.gif bgcolor=#99ffff>")
}
document.write("<TABLE BORDER='0' CELLPADDING=10>")
n=5;
m=3;
Number=0;
for(j=0;j<m;j++){
    document.write("<TR>")
    for(i=0;i<n;i++){
        document.write("<TD>")
        document.write("<A HREF='javascript:tap("+Number+")'>")
        document.write("<IMG NAME='mole"+Number+"' SRC='./hae"+0+".gif' HEIGHT=40 WIDTH=40 ALIGN='middle' BORDER=0></A>")
        document.write("</TD>")
        Number++
    }
    document.write("</TR>")
}
document.write("</TR></TABLE>")
if(brVersion >=4){
    document.write("</TD>")
}
document.write("</TR></TABLE>")
//-------->
</SCRIPT>
<TABLE width=300>
<INPUT TYPE="hidden" NAME=Point VALUE="Point">
<INPUT TYPE="hidden" NAME=mode VALUE="send">
<BR><CENTER><FONT SIZE=3 color=#000000><B>�i�q�b�g�F+10�_  �~�X�F-2�_</B></FONT>
<FONT SIZE=3 color=#000000><B>  �݂̂����F-1�_�j</B></FONT></CENTER>
<B></B></TD></TR></TD><TR>
</TABLE><P>
<A HREF ="fsmole.cgi?mode=list"></A><P>
</CENTER></FORM><TABLE><TD>
</TD></TABLE>
<DIV ALIGN="right">
<font size=2><TT>Flash-MoleHit Version 1.3�F<A HREF="http://appoh.execweb.cx/" TARGET="_blank">�����ہ[</A></TT></font>
</DIV></BASEFONT>
</BODY></HTML>
