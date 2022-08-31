/**
 * KlbChat-Modern 2.3.8
 * @package     Modern-Chat
 * @subpackage  System Core
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2019 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('Klb.system.Libs', {
    extend: 'Ext.Base',
    singleton: true,
    numLoadedFiles: 0,
});

    function chatcontent_onshow() {
        Klb.system.Im.setKlbsignal('onhide',  threadParams.tplcontainer, 0);
        Klb.system.Im.setKlbsignal('onshow', 'body_content', 5 );
        Klb.system.Im.setKlbsignal('onshow', 'msgwndtd',     10 );
        Klb.system.Im.setKlbsignal('onshow', 'msgcontent',   15 );
        Klb.system.Im.setKlbsignal('onshow', 'chat_topnav',  15 );
    }
    function tplcontainer_onshow() {
        Klb.system.Im.setKlbsignal('onshow',  threadParams.tplcontainer, 40);
        Klb.system.Im.setKlbsignal('onhide', 'body_content', 5 );
        Klb.system.Im.setKlbsignal('onhide', 'msgwndtd',    10 );
        Klb.system.Im.setKlbsignal('onhide', 'msgcontent',  15 );
        Klb.system.Im.setKlbsignal('onhide', 'chat_topnav', 15 );
    }
    function chatcontent_onhide() {
        Klb.system.Im.setKlbsignal('onhide', 'body_content', 15 );
        Klb.system.Im.setKlbsignal('onhide', 'msgwndtd',     10 );
        Klb.system.Im.setKlbsignal('onhide', 'chat_topnav',  15 );
    }

    function IndicatorTxt(){

        var maxTxt = messages.sys['max.question'], elemTxt = getObj(messages.ids['inp_txtsnd']), elemIdicat =  getObj(messages.ids['indicatorTxt']);
        if ( elemIdicat == null || elemTxt == null ) return false;
        var widthTxt  = elemTxt.offsetWidth, txtLength = elemTxt.value.length; txtProc   = Math.round((100*txtLength)/maxTxt);
        if ( txtProc>98) txtProc=99; else if ( txtProc < 1) txtProc=1;

        elemIdicat.style.width = Math.round (widthTxt/100*txtProc )+'px';
        return true;
    }

    function ValidateTxt(fieldValue){
        IndicatorTxt();
        if ( fieldValue.length <  2 || fieldValue == messages.sys['defaultfield.question'] ) return false;
        return (fieldValue.length < messages.sys['max.question']);
    }

    function ValidateName(fieldValue){
        if ( fieldValue.length <  2 || fieldValue == messages.sys['defaultfield.name']) return false;
        return true;
    }

    function ValidateBirthdayNumber() {
        var outRes = false, outStatus = '', fieldReg = '', elemCard = getObj(messages.ids['inp_birthday']);
        var fieldValue = elemCard.value;
        fieldReg = /^([0-9\s-\(\)]{8})*$/i; // удаляем все кроме цифр
        if ( fieldValue.match(fieldReg) ) {
            var fieldNew= fieldValue.match(/([0-9])+/g);
            fieldValue = fieldNew.join('');
        }
        var fieldChars = fieldValue, nI =0; fieldValue = '';
        for(var i =0; i < fieldChars.length; i++ ) {
            for(var j = nI; j < messages.sys['defaultfield.cardnumber'].length; j++ ) {

                if ( fieldChars[i] !==  messages.sys['defaultfield.birthdaynumber'][j] && messages.sys['defaultfield.birthdaynumber'][j] !== 'X')
                    fieldValue += messages.sys['defaultfield.birthdaynumber'][j];
                else if ( messages.sys['defaultfield.birthdaynumber'][j] == 'X' || fieldChars[i] ==  messages.sys['defaultfield.birthdaynumber'][j] ) {
                    nI = j+1;
                    break;
                }
            }
            fieldValue += fieldChars[i];
        }
        /* ПРОВЕРКА ПРАВИЛЬНОСТИ */
        if ( fieldValue.match (messages.sys['defaultfield.birthdaypattern']) )
        { /*Запоминание значения текущего поля на два шага вперед*/
            outRes= true;
            messages.sys['defaultfield.birthdaybuffer_dst']=messages.sys['defaultfield.birthdaybuffer_src'];
            messages.sys['defaultfield.birthdaybuffer_src']=fieldValue;
            elemCard.value = fieldValue;
        }
        return outRes;
    }

    function ValidateCardNumber() {
        var outRes = false, outStatus = '', fieldReg = '', elemCard = getObj(messages.ids['inp_numbercard']);
        var fieldValue = elemCard.value;
        fieldReg = /^([0-9\s-\(\)]{16})*$/i; // удаляем все кроме цифр
        if ( fieldValue.match(fieldReg) ) {
            var fieldNew= fieldValue.match(/([0-9])+/g);
            fieldValue = fieldNew.join('');
        }
        var fieldChars = fieldValue, nI =0; fieldValue = '';
        for(var i =0; i < fieldChars.length; i++ ) {
            for(var j = nI; j < messages.sys['defaultfield.cardnumber'].length; j++ ) {

                if ( fieldChars[i] !==  messages.sys['defaultfield.cardnumber'][j] && messages.sys['defaultfield.cardnumber'][j] !== 'X')
                    fieldValue += messages.sys['defaultfield.cardnumber'][j];
                else if ( messages.sys['defaultfield.cardnumber'][j] == 'X' || fieldChars[i] ==  messages.sys['defaultfield.cardnumber'][j] ) {
                    nI = j+1;
                    break;
                }
            }
            fieldValue += fieldChars[i];
        }
        /* ПРОВЕРКА ПРАВИЛЬНОСТИ */
        if ( fieldValue.match (messages.sys['defaultfield.cardpattern']) )
        { /*Запоминание значения текущего поля на два шага вперед*/
            outRes= true;
            messages.sys['defaultfield.cardbuffer_dst']=messages.sys['defaultfield.cardbuffer_src'];
            messages.sys['defaultfield.cardbuffer_src']=fieldValue;
            elemCard.value = fieldValue;
        }
        return outRes;
    }

    function ValidatePhoneNumber(){
        var outRes = false, outStatus = '', fieldReg = '', elemPhone = getObj(messages.ids['inp_phone']);
        var fieldValue = elemPhone.value;
        fieldReg = /^([+]?[0-9\s-\(\)]{3,25})*$/i; // удаляем все кроме цифр
        if ( fieldValue.match(fieldReg) ) {
            var fieldNew= fieldValue.match(/([0-9])+/g);
            fieldValue = fieldNew.join('');
        }

        if ( fieldValue.substr(0,1) !== '+' ) fieldValue = '+' + fieldValue;
        var fieldChars = fieldValue, nI =0; fieldValue = '';
        for(var i =0; i < fieldChars.length; i++ ) {
            for(var j = nI; j < messages.sys['defaultfield.phonenumber'].length; j++ ) {

                if ( fieldChars[i] !==  messages.sys['defaultfield.phonenumber'][j] && messages.sys['defaultfield.phonenumber'][j] !== 'X')
                    fieldValue += messages.sys['defaultfield.phonenumber'][j];
                else if ( messages.sys['defaultfield.phonenumber'][j] == 'X' || fieldChars[i] ==  messages.sys['defaultfield.phonenumber'][j] ) {
                    nI = j+1;
                    break;
                }
            }
            fieldValue += fieldChars[i];
        }
        /* ПРОВЕРКА ПРАВИЛЬНОСТИ */
        if ( fieldValue.match (messages.sys['defaultfield.phonepattern']) )
        { /*Запоминание значения текущего поля на два шага вперед*/
            outRes= true;
            messages.sys['defaultfield.phonebuffer_dst']=messages.sys['defaultfield.phonebuffer_src'];
            messages.sys['defaultfield.phonebuffer_src']=fieldValue;
            elemPhone.value = fieldValue;
        }
        return outRes;
    }

    function ValidateCarD(fieldValue){
        if ( fieldValue.length <  5 || fieldValue == messages.sys['defaultfield.email'] ) return false;
        return ValidateCardNumber();
    }

    function ValidatePhone(fieldValue){
        if ( fieldValue.length <  5 || fieldValue == messages.sys['defaultfield.email'] ) return false;
        return true;  // ValidatePhoneNumber();
    }

    function ValidateEmail(fieldValue){
        if ( fieldValue.length <  5  || fieldValue == messages.sys['defaultfield.email']) return false;
        var regex = new RegExp(messages.sys['defaultfield.emailpattern'] );
        return regex.test(fieldValue);
    }
    function validateStepDwn(step, value){
        var res = false;
        if ( step == 'phone') res =ValidatePhone(value);
        else if ( step == 'txtsnd') res = ValidateTxt(value);
        else if ( step == 'email') res = ValidateEmail(value);
        return true;
    }

    function validateStep(step, value){

        if ( step == 'birthday' ) {
            return  ValidateBirthdayNumber();
        } else if ( step == 'numbercart') {
            return  ValidateCardNumber();
        } else if ( step == 'phone')  {
    //             return  ValidatePhoneNumber();
        }
        var iStep =0, res = false, elem  = getObj('btn_form_submit_button')
            , elemEmail = getObj(messages.ids['inp_email']) , elemPhone = getObj(messages.ids['inp_phone'])
            , elemName = getObj(messages.ids['inp_firstname']) , elemTxt = getObj(messages.ids['inp_txtsnd'])
            , elemCard = getObj(messages.ids['inp_numbercard']);

        if ( elemEmail && elemEmail.value == messages.sys['defaultfield.email'] ) { /// default
            elemEmail.value = '';
        }
        if ( elemPhone && elemPhone.value == messages.sys['defaultfield.phone']  ) {
            elemPhone.value = '';
        }
        if ( elemTxt && elemTxt.value == messages.sys['defaultfield.question'] ) {
            _is_submit = false; elemTxt.value = '';
        }

        if ( elemName && ValidateName(elemName.value) ) { iStep++; removeClass(elemName, 'borderalert') }
        else if ( elemName ) { addClass(elemName, 'borderalert') }
        if ( elemEmail && ValidateEmail(elemEmail.value) )  { iStep++; removeClass(elemEmail, 'borderalert') }
    //                else if ( elemEmail && elemEmail.value != '' && !ValidateEmail(elemEmail.value)  ) { iStep = 0; addClass(elemEmail, 'borderalert') }
        else if ( elemEmail ) { addClass(elemEmail, 'borderalert') }
        if ( elemPhone && ValidatePhone(elemPhone.value) )  { iStep++; removeClass(elemPhone, 'borderalert') }
    //                else if ( elemPhone && elemPhone.value != '' && !ValidatePhone(elemPhone.value)  ) { iStep = 0; addClass(elemPhone, 'borderalert') }
        else if ( elemPhone   ) {  addClass(elemPhone, 'borderalert') }

        if ( elemTxt && ValidateTxt(elemTxt.value) )  { iStep++; removeClass(elemTxt, 'borderalert') }
        else if ( elemTxt ) { addClass(elemTxt, 'borderalert') }

        if ( iStep >= messages.sys['stepok'] ) { res = true; elem.className = "button_bg"; elem.disabled = false;  }
        else { elem.className = "button_gr"; elem.disabled = true; }
        return res;
    }

    function get_submit_fields(fromInp) {

        var dataInp = {}, elem = false;
        if ( !fromInp ) return false;

        for ( i=0; i<fromInp.elements.length; i++)
        {
            elem = fromInp.elements[i];
            if ( rradiocheck.test( elem.type ) ) {
                if ( elem.checked )
                    dataInp[elem.name] = elem.value;
            } else
                dataInp[elem.name] = elem.value;
        }
        return  { servl: fromInp.getAttribute("action")  ? fromInp.getAttribute("action") : fromInp.action,  servData: dataInp };
    }

    function form_completeId(_response) {
        console.log(_response);
    }

    function form_submitId(fromId, formAdd) {
        var elemBtn = getObj('submit_button-' + fromId);
        fromIdInp = 'from-' + fromId,
            contentId = 'content-' + fromId,
            fromCheckedId = 'checked-' + fromId,
            fromSubmitedId = 'submited-' + fromId,
            fromInp = getObj( fromIdInp ),
            formAdd = formAdd || false,
            fieldVal = {};

        if ( !getObj( fromIdInp ) ) return false;
        fieldVal = get_submit_fields(fromInp);
        if ( formAdd ) for (var prop in formAdd) {
            if (prop !== 'before' ) fieldVal.servData[prop] = formAdd[prop];
            else if (prop == 'before' ) {
                fieldCheck = formAdd[prop].field;
                if ( fieldCheck && typeof fieldVal.servData[fieldCheck] ==="undefined" ) {
                    Klb.system.Im.setKlbsignal('onshow', fromCheckedId);
                    Klb.system.Im.setKlbsignal('onhide', fromCheckedId, 2000);
                    return false;
                }
            }
        }
        _is_submit = !Klb.system.Im.setKlbsignal('onsubmit', fieldVal, 0, form_completeId || {} );
        if ( _is_submit && elemBtn ) { elemBtn.disabled = false; /*setClass( elemBtn, "button_bg"); */ }
        else { elemBtn.disabled = true; /*setClass( elemBtn, "button_gr"); */}

        Klb.system.Im.setKlbsignal('onhide', contentId, 10 );
        if ( getObj(fromSubmitedId) ) Klb.system.Im.setKlbsignal('onshow', fromSubmitedId, 15 );
        return false;
    }

    function form_onsubmited(_response) {
        Klb.system.Im.setKlbsignal('onresponse', { servId: threadParams.tplcontainer, servData: _response }, 20 );
        Klb.system.Im.setKlbsignal('onhide', 'chatloading');
        Klb.system.Im.setKlbsignal('onclear', threadParams.tplcontainer, threadParams.tplHideTime  || 10 );
        Klb.system.Im.setKlbsignal('onhide', threadParams.tplcontainer, threadParams.tplHideTime  || 10 );
    //         chatcontent_onshow();
    }

    function form_submit(fromInp) {
        var _is_submit = validateStep('all', true);
        if ( _is_submit == true ) {
            _is_submit = !Klb.system.Im.setKlbsignal('onsubmit', get_submit_fields(fromInp), 0, form_onsubmited || {} );
            Klb.system.Im.setKlbsignal('onshow', 'chatloading');
            Klb.system.Im.setKlbsignal('onhide', threadParams.tabfromcontainer);
            Klb.system.Im.setKlbsignal('onhide', threadParams.tplcontainer, 10 );
            Klb.system.Im.setKlbsignal('onfunc', 'chatcontent_onshow' , 10);
        }
        return _is_submit;
    }


    _klbThInp.push(['thread.ui.form.submitid', function () {
        form_submitId(arguments[0]);
    }]);
    _klbThInp.push(['thread.ui.form.submit', function () {
        form_submit(arguments[0]);
    }]);