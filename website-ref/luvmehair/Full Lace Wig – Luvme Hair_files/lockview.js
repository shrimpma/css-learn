﻿var lkvw_sys;var lkvw_type;var lkvw_GUID;var lkvw_01;var lkvw_02;var lkvw_03;var lkvw_04;var lkvw_05;var lkvw_06;var lkvw_07;var lkvw_09;var lkvw_11;var lkvw_14;var lkvw_16;var lkvw_18;var lkvw_19;var lkvw_22;var lkvw_24;var lkvw_53;var lkvw_40=document.getElementsByTagName('script');for(var _2=0;_2<lkvw_40.length;_2++){if(lkvw_40[_2].src==undefined||lkvw_40[_2].src=="")continue;else{if(lkvw_40[_2].src.toLowerCase().replace('dwcheck','lockview').indexOf(".lockview.cn/js/lockview.js?")==-1)continue;else{lkvw_53=lkvw_40[_2].src;break;}}}var _2_3="http://";if(window.location.protocol=="https:"){_2_3="https://";}if(lkvw_53==undefined){window.location.href="http://www.lockview.cn/Stop/?RestrictByLockview";}try{lkvw_type=lkvw_53.split('=')[1].replace('&uid','');}catch(e){lkvw_type='nothing';}var _2_3_4='LK000';if(_2_3_4.indexOf(lkvw_type)!=-1){}else{if(lkvw_type!='login'){if(lkvw_23('lkvw_02')!='v5'){lkvw_11=lkvw_21();lkvw_05=lkvw_33();lkvw_09=lkvw_type;lkvw_14=document.referrer;if(lkvw_14!=undefined)lkvw_14=lkvw_14.toLowerCase();if(lkvw_14.replace('dwcheck','lockview').indexOf('.lockview.cn/lockview/restrict')!=-1){if(lkvw_09!=undefined)lkvw_09=lkvw_09.toLowerCase();if(lkvw_14.indexOf('uid='+lkvw_09)!=-1){lkvw_08();if(lkvw_23('lkvw_20')!=null)window.location.href=_2_3+lkvw_23('lkvw_20');}}else lkvw_06();}}else{lkvw_11=document.location.hostname;lkvw_05=lkvw_53.substr(0,lkvw_53.indexOf('/Js'));if(lkvw_09==undefined||lkvw_09==''){lkvw_09=lkvw_53.split('=')[2];if(lkvw_09==undefined)lkvw_09='';else{lkvw_26();}}}}function lockview_login(){lkvw_type='login';this.lkvw_25();}function lkvw_25(){lkvw_22=document.forms[0].elements['Username'].value.replace(/^\s+|\s+$/g,"");lkvw_24=document.forms[0].elements['Password'].value.replace(/^\s+|\s+$/g,"");var chkpass=document.getElementById("chkPassword");if(chkpass!=null&&chkpass.checked==true){lkvw_13("lkvw_03",lkvw_22,90);lkvw_13("lkvw_04",lkvw_24,90);}else{lkvw_10('lkvw_03');lkvw_10('lkvw_04');}lkvw_GUID=Math.round(Math.random()*217710);if(lkvw_22=='')alert('请输入用户名!');else{if(lkvw_24=='')alert('请输入密码!');else{var lkvw_44=document.createElement('SCRIPT');lkvw_44.src=lkvw_05+'/lockview/Restrict.aspx?uid='+lkvw_09+'&domain='+lkvw_11+'&user='+encodeURIComponent(lkvw_22)+'&pwd='+encodeURIComponent(lkvw_24)+'&r='+lkvw_GUID;document.body.appendChild(lkvw_44);}}}function lkvw_21(){lkvw_02=document.location.hostname.toLowerCase();if(lkvw_02.substring(lkvw_02.length-1,lkvw_02.length)=='.')lkvw_02=lkvw_02.substring(0,lkvw_02.length-1);if(lkvw_02.indexOf('www.')==-1){var lkvw_45=lkvw_02.replace(/[^.]/g,'').length;if(lkvw_45==1)return lkvw_02;lkvw_07=unescape(document.location.href);if(lkvw_07!=undefined)lkvw_07=lkvw_07.toLowerCase();lkvw_04=lkvw_07.substr(0,lkvw_07.indexOf('?'));if(lkvw_04.indexOf('.php')!=-1||lkvw_04.indexOf('proxy')!=-1)return lkvw_02;if(lkvw_04.indexOf('.asp')!=-1||lkvw_04.indexOf('.jsp')!=-1||lkvw_04.indexOf('.aspx')!=-1)return lkvw_02;var lkvw_46=lkvw_07.indexOf('www.');if(lkvw_46!=-1){lkvw_07=lkvw_07.substr(lkvw_46+4);var lkvw_47=lkvw_07.indexOf('/');lkvw_02=lkvw_07.substr(0,lkvw_47);}}return lkvw_02;}function lkvw_06(){if(navigator.appName=='Netscape')lkvw_03=navigator.language;else{lkvw_03=navigator.browserLanguage;lkvw_16=navigator.systemLanguage;}if(lkvw_03!=undefined&&lkvw_03.length>1)lkvw_03=lkvw_03.toLowerCase();else lkvw_03='';if(lkvw_16!=undefined)lkvw_16=lkvw_16.toLowerCase();else lkvw_16='';lkvw_GUID=Math.round(Math.random()*217710);lkvw_18=-(new Date()).getTimezoneOffset();lkvw_18=lkvw_18/60;lkvw_06=document.referrer;if(lkvw_06!=undefined){lkvw_06=lkvw_06.toLowerCase();if(lkvw_06.indexOf('127.0.0.1:')!=-1&&lkvw_06.indexOf('/loc/')!=-1)lkvw_16='lkvw_01';if(lkvw_06.indexOf('proxy')!=-1||lkvw_06.indexOf('daili')!=-1)lkvw_16='lkvw_01';if(lkvw_16=='lkvw_01')window.location.href=_2_3+lkvw_11+'?RestrictByLockview';}lkvw_17=lkvw_06.substr(lkvw_06.indexOf('//')+2);lkvw_17=lkvw_17.substr(0,lkvw_17.indexOf('/'));if(lkvw_17.indexOf('www.')!=-1)lkvw_17=lkvw_17.substr(4);lkvw_19=new String(document.location);lkvw_19=lkvw_19.replace('https://','').replace('http://','');document.cookie='lkvw_20='+lkvw_19+';path=/';if(lkvw_23('dwst_12')!=null)lkvw_sys=lkvw_23('dwst_12');if(lkvw_23('lkvw_01')=='lkvw_type')lkvw_sys='J2EE';if(lkvw_sys==undefined)lkvw_sys='';if(lkvw_11.indexOf("&")!=-1)lkvw_11=lkvw_11.substring(0,lkvw_11.indexOf("&"));document.write("<script type='text/javascript' src='"+lkvw_05+"/lockview/Judge.aspx?a="+lkvw_09+"&f="+lkvw_11+"&b="+lkvw_18+"&l="+lkvw_03+"&d="+lkvw_16+"&o="+lkvw_17+"&s="+lkvw_sys+"&r="+lkvw_GUID+"'></script>");if(lkvw_type=='lock'){lk2(lkvw_23('lkvw_02'));lkvw_19='none';}else lkvw_19='hidden';}function lkvw_15(lkvw_35,lkvw_36){var lkvw_37;if(lkvw_36=='v5'){if(lkvw_35=='')lk2(lkvw_23('lkvw_02'));else lkvw_37='1';}else{if(lkvw_35!=undefined)lkvw_37=lkvw_35;else lkvw_37=lkvw_06();}if(lkvw_37!=undefined){switch(lkvw_37.substr(0,1)){case'0':lkvw_08();if(lkvw_type=='login'){if(lkvw_23('lkvw_20')!=null)window.location.href=_2_3+lkvw_23('lkvw_20');else window.location.href=_2_3+lkvw_11;}break;case'1':window.status='';if(document.all){document.execCommand('stop');}if(lkvw_37.substr(4,4)=='www.'){lkvw_37=lkvw_37.replace(',$t',',$t'+_2_3);}if(lkvw_37.substr(2,2)=='$t'){document.title='';lkvw_36=unescape(lkvw_37.substr(4));if(lkvw_36.substr(0,4)=='http')window.location=lkvw_36;else window.location=_2_3+lkvw_11+"/"+lkvw_36;break;}if(lkvw_37.substr(2,2)=='$d'){lkvw_15('4,'+lkvw_37.substr(2),'lk2');break;}if(lkvw_37.substr(2,2)=='$b'){lkvw_15('4,'+unescape(lkvw_37).substr(2),'lk2');break;}if(lkvw_37.substr(2,2)=='$s'){document.title='';window.location.href=_2_3+lkvw_05.replace('http://','').replace('https://','')+'/LockView/Restrict.aspx?uid='+lkvw_09+'&domain='+lkvw_11;break;}if(lkvw_37.substr(2)!=''){if(lkvw_37.substr(2)!='lockview.htm')window.location.href=_2_3+(lkvw_11+'/'+lkvw_37.substr(2)).replace('//','/');else{lkvw_15('4,'+lkvw_37.substr(2),'lk2');lkvw_26();}}break;case'2':lkvw_12('2');break;case'3':lkvw_12('3');break;case'4':lk1(lkvw_37);if(lkvw_type!='v5'&&lkvw_37=='4'){lkvw_12('6');}else{if(lkvw_37.indexOf('lockview')!=-1||lkvw_37.indexOf('unfind')!=-1){if(document.all){document.execCommand('stop');}else{document.execCommand('stop');try{window.stop();}catch(e){}}}if(lkvw_type=='v5')lk2('v5,login.htm');}break;case'5':alert('用户名或者密码错误.');break;case'6':alert('此用户名已过期.');break;case'7':if(lkvw_23('lkvw_01')==null)lkvw_13('lkvw_01','lkvw_type',90);if(lkvw_37.substr(2,2)=='$d')lkvw_15('4,'+lkvw_37.substr(2),'lk2');else lkvw_15('1,'+lkvw_37.substr(2),'lk1');break;}}}function lkvw_33(){if(!lkvw_53)return null;lkvw_01=lkvw_53.substr(0,lkvw_53.indexOf('/Js'));if(lkvw_01.indexOf('lockview.cn')!=-1||lkvw_01.indexOf('dwcheck.cn')!=-1)return lkvw_01;else{if(lkvw_01=="")lkvw_01="localhost";if(lkvw_01.indexOf("http://")==-1)lkvw_01="http://"+lkvw_01;window.location.href=lkvw_01+'/Stop/?RestrictByLockview';}}function lk1(lkvw_36){if(lkvw_36!='lkvw_07'){if(lkvw_36.indexOf('lockview')!=-1){lkvw_14=lkvw_login();lkvw_35='4';}else{if(lkvw_36.indexOf('unfind')!=-1){lkvw_14=lkvw_unfind();lkvw_35='4';}else{var lkvw_35;var lkvw_37;if(lkvw_36.indexOf('$$d')!=-1){lkvw_37='$$d';lkvw_35='4';}if(lkvw_36.indexOf(',$b')!=-1){lkvw_37='$$b';lkvw_35='5';}lkvw_14="<frame name='contents' target='main' src='"+lkvw_36.substr(4,lkvw_36.indexOf(lkvw_37)-4)+"' noresize scrolling='YES' frameborder='NO'>";}}if(lkvw_36=='4'||lkvw_36=='2'){document.write("<script type='text/javascript' src='"+lkvw_05+"/lockview/JudgeCode.aspx?judge="+lkvw_36+",uid:"+lkvw_09+",domain:"+lkvw_11+",location_hostname:"+document.location.hostname+"'></script>");}else{lkvw_sys=lkvw_14;lkvw_12(lkvw_35);}}else lkvw_15(lkvw_36,'v5');}function lk2(lkvw_37){if(lkvw_37!=undefined){lkvw_37=unescape(lkvw_37);var v6=lkvw_37.split(';');lkvw_37=v6[0];v6=v6[1];if((parseInt(v6)+19)==parseInt(lkvw_GUID)){if(lkvw_37.substr(2,2)=='$d')document.title=decodeURI(lkvw_37.substr(lkvw_37.indexOf('$$d')+3));if(lkvw_37.substr(2,2)=='$b'){if(lkvw_37.indexOf('$$b')==-1)lkvw_37=lkvw_37+'$$bHome';document.title=decodeURI(lkvw_37.substr(lkvw_37.indexOf('$$b')+3));}lkvw_15(lkvw_37,'v6');}}else lk1('2');return lkvw_37;}function lkvw_23(lkvw_37){var lkvw_48=document.cookie.match(new RegExp("(^| )"+lkvw_37+"=([^;]*)(;|$)"));if(lkvw_48!=null)return unescape(lkvw_48[2]);return null;}function lkvw_08(){lkvw_10('lkvw_01');document.cookie='lkvw_02=v5;path=/';}function lkvw_13(lkvw_36,lkvw_38,lkvw_37){if(lkvw_37){var lkvw_49=new Date();lkvw_49.setTime(lkvw_49.getTime()+(lkvw_37*24*60*60*1000));var lkvw_50='; expires='+lkvw_49.toGMTString();}else var lkvw_50='';document.cookie=lkvw_36+'='+lkvw_38+lkvw_50+'; path=/';}function lkvw_26(){if(lkvw_23("lkvw_04")!=null){chkpass=document.getElementById("chkPassword");if(chkpass!=null){chkpass.checked=true;lkvw_22=document.getElementById("Username");lkvw_22.value=lkvw_23("lkvw_03");lkvw_24=document.getElementById("Password");lkvw_24.value=lkvw_23("lkvw_04");}}}function lkvw_10(lkvw_38){var lkvw_51=new Date();lkvw_51.setTime(lkvw_51.getTime()-1);var lkvw_52=lkvw_23(lkvw_38);if(lkvw_52!=null)document.cookie=lkvw_38+'='+lkvw_52+';expires='+lkvw_51.toGMTString();}function lkvw_12(lkvw_39){switch(lkvw_39){case'2':lkvw_39='<span style=font-size:14px;color:Red>&#24744;&#30340;&#24080;&#21495;&#24050;&#21040;&#26399;<\/span><br>&#35831;&#32493;&#36153;&#21518;&#20351;&#29992;,&nbsp;<a href=http://www.lockview.cn/Payment.html>&#32493;&#36153;&#39029;&#38754;</a>';break;case'3':lkvw_39='<span style=font-size:14px;color:Red>&#35797;&#29992;&#26399;&#24050;&#36807;&#65292;&#38480;&#21046;&#26381;&#21153;&#24050;&#26242;&#20572;<\/span><br>&#35831;&#20184;&#36153;&#21518;&#20351;&#29992;,&nbsp; <a href=http://www.lockview.cn/Payment.html>&#20184;&#36153;&#39029;&#38754;</a>';break;case'4':var lkvw_60="<html><head/><body style=margin:0>"+unescape(lkvw_14)+"</body></html><script type='text/javascript' defer>document.body.style.overflow=document.documentElement.style.overflow= '"+lkvw_19+"';";if(document.all)lkvw_60+="document.execCommand('stop');</script>";else lkvw_60+="document.execCommand('stop'); try{window.stop();}catch(e){}</script>";document.write(lkvw_60);break;case'5':var lkvw_60="<frameset rows='*'><frameset cols='*' frameborder='NO' border='0' framespacing='0' rows='*'>"+unescape(lkvw_14)+"<noframes><body bgcolor='#FFFFFF' text='#000000'>Your Browser does not support frames.</body></noframes></frameset>";document.write(lkvw_60);break;case'6':lkvw_39='<span style=font-size:14px;color:Red>&#24080;&#21495;&#20013;&#19981;&#21253;&#25324;&#24403;&#21069;&#22495;&#21517;<\/span><br>&#24744;&#22312;&#25511;&#21046;&#21488;&#20013;&#35774;&#32622;&#30340;&#32593;&#31449;&#22495;&#21517;&#19981;&#21253;&#25324;&#24403;&#21069;&#32593;&#31449;&#65292;&#35831;&#20180;&#32454;&#26680;&#23545;&#12290;';break;}if(lkvw_39!='4'&&lkvw_39!='5'){document.writeln('<div id=lk3_info style=z-index:99999;position:absolute;top:0px;left:0px;height:120px;border:#a6b4cf 1px solid;background-color:#c9d3f3>');document.writeln('<table width=260px border=0 cellpadding=0 cellspacing=0 style=font-size:12px;color:#1f336b;border-top:#fff 1px solid; border-left:#fff 1px solid bgcolor=#cfdef4>');document.writeln('<tr><td style=padding:2px 0>&nbsp;&#31532;&#19977;&#20195;&#76;&#111;&#99;&#107;&#118;&#105;&#101;&#119;&#32593;&#31449;&#38480;&#21046;&#35775;&#38382;&#31995;&#32479;<\/td>');document.writeln('<td><span style=CURSOR:pointer onclick=lkvw_32()>×&nbsp;<\/span><\/td><\/tr>');document.writeln('<tr><td colspan=2 height=96 style=padding:0 1px 1px 0>');document.writeln('<div style=padding:10px;height:100%;line-height:20px;border:#728eb8 1px solid>'+lkvw_39+'<\/div><\/tr><\/table><\/div>');lkvw_31();}}function lkvw_31(){lk3_info.style.top=0;lk3_info.style.right=document.body.scrollLeft+document.body.clientWidth-180;setTimeout('lkvw_31();',80);}function lkvw_32(){lk3_info.style.visibility=lkvw_19;}function lkvw_login(){var v7=("<form action=\"\" style=\"font-family:verdana;font-size:14px\" onkeydown=\"if(event.keyCode==13)document.getElementById('btnSumbit').click()\"><div style=\"margin:40px;width:450px;height:500px;padding:4px;font-size:12px;text-align:left;line-height:22px\"><fieldset style=\"padding:25px\"><legend>Client Login<\/legend><br \/>");v7+=("<label for=\"Username\">Username <\/label> <input id=\"Username\" name=\"Username\" value=\"common\" \/><br \/>");v7+=("<label for=\"Password\">Password <\/label> <input id=\"Password\" name=\"Password\" type=\"password\" value=\"\" \/><br \/><br \/><br \/>");v7+=("<input id=\"btnSumbit\" type=\"button\" value=\"Login\" onclick=\"lockview_login();return false;\" \/>&nbsp;&nbsp;&nbsp;&nbsp;<input id=\"chkPassword\" name=\"chkPassword\" type=\"checkbox\" />Remember Password<\/fieldset><\/div><\/form>");document.title="Password?";return v7;}function lkvw_unfind(){var v8='<TABLE cellSpacing=10 width=500 border=0 style=margin:15px;font-size:9pt;text-align:left><TR><TD><div style=font-size:12pt>无法找到该网页</div><br>您正在搜索的页面可能已经删除、更名或暂时不可用。<HR><P>请尝试以下操作：</P>';v8+='<UL style=font-size:12px><LI>确保浏览器的地址栏中显示的网站地址的拼写和格式正确无误。<LI>如果通过单击链接而到达了该网页，请与网站管理员联系，通知他们该链接的格式不正确。<LI>单击<A style=color:Red href=javascript:history.back(1)>后退</A>按钮尝试另一个链接。 </LI></UL><br>HTTP 错误 404 - 文件或目录未找到。</UL></TD></TR></TABLE>';return v8;}//