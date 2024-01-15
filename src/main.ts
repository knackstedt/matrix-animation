import { MatrixOptions as MatrixAnimationOptions, MatrixAnimationRaindropOptions } from './types';


const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const randomFloat = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

export class MatrixAnimation {
    private container: HTMLElement;
    private _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    get canvas() { return this._canvas; }
    get ctx() { return this._ctx ?? (this._ctx = this.canvas.getContext('2d')); }

    frameId = 0;
    // full screen dimensions
    canvasWidth = 0;
    canvasHeight = 0;
    charLists = [
        '⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿⡀⡁⡂⡃⡄⡅⡆⡇⡈⡉⡊⡋⡌⡍⡎⡏⡐⡑⡒⡓⡔⡕⡖⡗⡘⡙⡚⡛⡜⡝⡞⡟⡠⡡⡢⡣⡤⡥⡦⡧⡨⡩⡪⡫⡬⡭⡮⡯⡰⡱⡲⡳⡴⡵⡶⡷⡸⡹⡺⡻⡼⡽⡾⡿⢀⢁⢂⢃⢄⢅⢆⢇⢈⢉⢊⢋⢌⢍⢎⢏⢐⢑⢒⢓⢔⢕⢖⢗⢘⢙⢚⢛⢜⢝⢞⢟⢠⢡⢢⢣⢤⢥⢦⢧⢨⢩⢪⢫⢬⢭⢮⢯⢰⢱⢲⢳⢴⢵⢶⢷⢸⢹⢺⢻⢼⢽⢾⢿⣀⣁⣂⣃⣄⣅⣆⣇⣈⣉⣊⣋⣌⣍⣎⣏⣐⣑⣒⣓⣔⣕⣖⣗⣘⣙⣚⣛⣜⣝⣞⣟⣠⣡⣢⣣⣤⣥⣦⣧⣨⣩⣪⣫⣬⣭⣮⣯⣰⣱⣲⣳⣴⣵⣶⣷⣸⣹⣺⣻⣼⣽⣾⣿',
        // 'ঀঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহঽৎড়ঢ়য়ৠৡ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻ৼ৽',
        // 'ꤰꤱꤲꤳꤴꤵꤶꤷꤸꤹꤺꤻꤼꤽꤾꤿꥀꥁꥂꥃꥄꥅꥆ',
        // 'ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰᛱᛲᛳᛴᛵᛶᛷᛸ',
        // '𝌀𝌁𝌂𝌃𝌄𝌅𝌆𝌇𝌈𝌉𝌊𝌋𝌌𝌍𝌎𝌏𝌐𝌑𝌒𝌓𝌔𝌕𝌖𝌗𝌘𝌙𝌚𝌛𝌜𝌝𝌞𝌟𝌠𝌡𝌢𝌣𝌤𝌥𝌦𝌧𝌨𝌩𝌪𝌫𝌬𝌭𝌮𝌯𝌰𝌱𝌲𝌳𝌴𝌵𝌶𝌷𝌸𝌹𝌺𝌻𝌼𝌽𝌾𝌿𝍀𝍁𝍂𝍃𝍄𝍅𝍆𝍇𝍈𝍉𝍊𝍋𝍌𝍍𝍎𝍏𝍐𝍑𝍒𝍓𝍔𝍕𝍖',
        // '𑨀𑨋𑨌𑨍𑨎𑨏𑨐𑨑𑨒𑨓𑨔𑨕𑨖𑨗𑨘𑨙𑨚𑨛𑨜𑨝𑨞𑨟𑨠𑨡𑨢𑨣𑨤𑨥𑨦𑨧𑨨𑨩𑨪𑨫𑨬𑨭𑨮𑨯𑨰𑨱𑨲𑨿𑩀𑩂𑩃𑩄𑩅𑩆',
        // '𐰀𐰁𐰂𐰃𐰄𐰅𐰆𐰇𐰈𐰉𐰊𐰋𐰌𐰍𐰎𐰏𐰐𐰑𐰒𐰓𐰔𐰕𐰖𐰗𐰘𐰙𐰚𐰛𐰜𐰝𐰞𐰟𐰠𐰡𐰢𐰣𐰤𐰥𐰦𐰧𐰨𐰩𐰪𐰫𐰬𐰭𐰮𐰯𐰰𐰱𐰲𐰳𐰴𐰵𐰶𐰷𐰸𐰹𐰺𐰻𐰼𐰽𐰾𐰿𐱀𐱁𐱂𐱃𐱄𐱅𐱆𐱇𐱈',
        // '𐄇𐄈𐄉𐄊𐄋𐄌𐄍𐄎𐄏𐄐𐄑𐄒𐄓𐄔𐄕𐄖𐄗𐄘𐄙𐄚𐄛𐄜𐄝𐄞𐄟𐄠𐄡𐄢𐄣𐄤𐄥𐄦𐄧𐄨𐄩𐄪𐄫𐄬𐄭𐄮𐄯𐄰𐄱𐄲𐄳',
        // '🞀🞁🞂🞃🞄🞅🞆🞇🞈🞉🞊🞋🞌🞍🞎🞏🞐🞑🞒🞓🞔🞕🞖🞗🞘🞙🞚🞛🞜🞝🞞🞟🞠🞡🞢🞣🞤🞥🞦🞧🞨🞩🞪🞫🞬🞭🞮🞯🞰🞱🞲🞳🞴🞵🞶🞷🞸🞹🞺🞻🞼🞽🞾🞿🟀🟁🟂🟃🟄🟅🟆🟇🟈🟉🟊🟋🟌🟍🟎🟏🟐🟑🟒🟓🟔🟕🟖🟗🟘',
        // '🁢🁣🁤🁥🁦🁧🁨🁩🁪🁫🁬🁭🁮🁯🁩🁪🁫🁬🁭🁮🁯🁰🁱🁲🁳🁴🁵🁶🁷🁸🁹🁺🁻🁼🁽🁾🁿🂀🂁🂂🂃🂄🂅🂆🂇🂈🂉🂊🂋🂌🂍🂎🂏🂐🂑🂒🂓',
        // '🀀🀁🀂🀃🀅🀆🀇🀈🀉🀊🀋🀌🀍🀎🀏🀐🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀢🀣🀤🀥🀦🀧🀨🀩🀪🀫',
        // '🂠🂡🂢🂣🂤🂥🂦🂧🂨🂩🂪🂫🂬🂭🂮🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂼🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃌🃍🃎🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂼🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃌🃍🃎🃑🃒🃓🃔🃕🃖🃗🃘🃙🃚🃛🃜🃝🃞🃟',
        // '🀰🀱🀲🀳🀴🀵🀶🀷🀸🀹🀺🀻🀼🀽🀾🀿🁀🁁🁂🁃🁄🁅🁆🁇🁈🁉🁊🁋🁌🁍🁎🁏🁐🁑🁒🁓🁔🁕🁖🁗🁘🁙🁚🁛🁜🁝🁞🁟🁠🁡',
        // '𑫀𑫁𑫂𑫃𑫄𑫅𑫆𑫇𑫈𑫉𑫊𑫋𑫌𑫍𑫎𑫏𑫐𑫑𑫒𑫓𑫔𑫕𑫖𑫗𑫘𑫙𑫚𑫛𑫜𑫝𑫞𑫟𑫠𑫡𑫢𑫣𑫤𑫥𑫦𑫧𑫨𑫩𑫪𑫫𑫬𑫭𑫮𑫯𑫰𑫱𑫲𑫳𑫴𑫵𑫶𑫷𑫸',
        // 'ᮃᮄᮅᮆᮇᮈᮉᮊᮋᮌᮍᮎᮏᮐᮑᮒᮓᮔᮕᮖᮗᮘᮙᮚᮛᮜᮝᮞᮟᮠᮮᮯ᮰᮱᮲᮳᮴᮵᮶᮷᮸᮹ᮺᮻᮼᮽᮾᮿᯀᯁᯂᯃᯄᯅᯆᯇᯈᯉᯊᯋᯌᯍᯎᯏᯐᯑᯒᯓᯔᯕᯖᯗᯘᯙᯚᯛᯜᯝᯞᯟᯠᯡᯢᯣᯤᯥ',
        // '𛅰𛅱𛅲𛅳𛅴𛅵𛅶𛅷𛅸𛅹𛅺𛅻𛅼𛅽𛅾𛅿𛆀𛆁𛆂𛆃𛆄𛆅𛆆𛆇𛆈𛆉𛆊𛆋𛆌𛆍𛆎𛆏𛆐𛆑𛆒𛆓𛆔𛆕𛆖𛆗𛆘𛆙𛆚𛆛𛆜𛆝𛆞𛆟𛆠𛆡𛆢𛆣𛆤𛆥𛆦𛆧𛆨𛆩𛆪𛆫𛆬𛆭𛆮𛆯𛆰𛆱𛆲𛆳𛆴𛆵𛆶𛆷𛆸𛆹𛆺𛆻𛆼𛆽𛆾𛆿𛇀𛇁𛇂𛇃𛇄𛇅𛇆𛇇𛇈𛇉𛇊𛇋𛇌𛇍𛇎𛇏𛇐𛇑𛇒𛇓𛇔𛇕𛇖𛇗𛇘𛇙𛇚𛇛𛇜𛇝𛇞𛇟𛇠𛇡𛇢𛇣𛇤𛇥𛇦𛇧𛇨𛇩𛇪𛇫𛇬𛇭𛇮𛇯𛇰𛇱𛇲𛇳𛇴𛇵𛇶𛇷𛇸𛇹𛇺𛇻𛇼𛇽𛇾𛇿𛈀𛈁𛈂𛈃𛈄𛈅𛈆𛈇𛈈𛈉𛈊𛈋𛈌𛈍𛈎𛈏𛈐𛈑𛈒𛈓𛈔𛈕𛈖𛈗𛈘𛈙𛈚𛈛𛈜𛈝𛈞𛈟𛈠𛈡𛈢𛈣𛈤𛈥𛈦𛈧𛈨𛈩𛈪𛈫𛈬𛈭𛈮𛈯𛈰𛈱𛈲𛈳𛈴𛈵𛈶𛈷𛈸𛈹𛈺𛈻𛈼𛈽𛈾𛈿𛉀𛉁𛉂𛉃𛉄𛉅𛉆𛉇𛉈𛉉𛉊𛉋𛉌𛉍𛉎𛉏𛉐𛉑𛉒𛉓𛉔𛉕𛉖𛉗𛉘𛉙𛉚𛉛𛉜𛉝𛉞𛉟𛉠𛉡𛉢𛉣𛉤𛉥𛉦𛉧𛉨𛉩𛉪𛉫𛉬𛉭𛉮𛉯𛉰𛉱𛉲𛉳𛉴𛉵𛉶𛉷𛉸𛉹𛉺𛉻𛉼𛉽𛉾𛉿𛊀𛊁𛊂𛊃𛊄𛊅𛊆𛊇𛊈𛊉𛊊𛊋𛊌𛊍𛊎𛊏𛊐𛊑𛊒𛊓𛊔𛊕𛊖𛊗𛊘𛊙𛊚𛊛𛊜𛊝𛊞𛊟𛊠𛊡𛊢𛊣𛊤𛊥𛊦𛊧𛊨𛊩𛊪𛊫𛊬𛊭𛊮𛊯𛊰𛊱𛊲𛊳𛊴𛊵𛊶𛊷𛊸𛊹𛊺𛊻𛊼𛊽𛊾𛊿𛋀𛋁𛋂𛋃𛋄𛋅𛋆𛋇𛋈𛋉𛋊𛋋𛋌𛋍𛋎𛋏𛋐𛋑𛋒𛋓𛋔𛋕𛋖𛋗𛋘𛋙𛋚𛋛𛋜𛋝𛋞𛋟𛋠𛋡𛋢𛋣𛋤𛋥𛋦𛋧𛋨𛋩𛋪𛋫𛋬𛋭𛋮𛋯𛋰𛋱𛋲𛋳𛋴𛋵𛋶𛋷𛋸𛋹𛋺𛋻',
        // 'ꀀꀁꀂꀃꀄꀅꀆꀇꀈꀉꀊꀋꀌꀍꀎꀏꀐꀑꀒꀓꀔꀕꀖꀗꀘꀙꀚꀛꀜꀝꀞꀟꀠꀡꀢꀣꀤꀥꀦꀧꀨꀩꀪꀫꀬꀭꀮꀯꀰꀱꀲꀳꀴꀵꀶꀷꀸꀹꀺꀻꀼꀽꀾꀿꁀꁁꁂꁃꁄꁅꁆꁇꁈꁉꁊꁋꁌꁍꁎꁏꁐꁑꁒꁓꁔꁕꁖꁗꁘꁙꁚꁛꁜꁝꁞꁟꁠꁡꁢꁣꁤꁥꁦꁧꁨꁩꁪꁫꁬꁭꁮꁯꁰꁱꁲꁳꁴꁵꁶꁷꁸꁹꁺꁻꁼꁽꁾꁿꂀꂁꂂꂃꂄꂅꂆꂇꂈꂉꂊꂋꂌꂍꂎꂏꂐꂑꂒꂓꂔꂕꂖꂗꂘꂙꂚꂛꂜꂝꂞꂟꂠꂡꂢꂣꂤꂥꂦꂧꂨꂩꂪꂫꂬꂭꂮꂯꂰꂱꂲꂳꂴꂵꂶꂷꂸꂹꂺꂻꂼꂽꂾꂿꃀꃁꃂꃃꃄꃅꃆꃇꃈꃉꃊꃋꃌꃍꃎꃏꃐꃑꃒꃓꃔꃕꃖꃗꃘꃙꃚꃛꃜꃝꃞꃟꃠꃡꃢꃣꃤꃥꃦꃧꃨꃩꃪꃫꃬꃭꃮꃯꃰꃱꃲꃳꃴꃵꃶꃷꃸꃹꃺꃻꃼꃽꃾꃿꄀꄁꄂꄃꄄꄅꄆꄇꄈꄉꄊꄋꄌꄍꄎꄏꄐꄑꄒꄓꄔꄕꄖꄗꄘꄙꄚꄛꄜꄝꄞꄟꄠꄡꄢꄣꄤꄥꄦꄧꄨꄩꄪꄫꄬꄭꄮꄯꄰꄱꄲꄳꄴꄵꄶꄷꄸꄹꄺꄻꄼꄽꄾꄿꅀꅁꅂꅃꅄꅅꅆꅇꅈꅉꅊꅋꅌꅍꅎꅏꅐꅑꅒꅓꅔꅕꅖꅗꅘꅙꅚꅛꅜꅝꅞꅟꅠꅡꅢꅣꅤꅥꅦꅧꅨꅩꅪꅫꅬꅭꅮꅯꅰꅱꅲꅳꅴꅵꅶꅷꅸꅹꅺꅻꅼꅽꅾꅿꆀꆁꆂꆃꆄꆅꆆꆇꆈꆉꆊꆋꆌꆍꆎꆏꆐꆑꆒꆓꆔꆕꆖꆗꆘꆙꆚꆛꆜꆝꆞꆟꆠꆡꆢꆣꆤꆥꆦꆧꆨꆩꆪꆫꆬꆭꆮꆯꆰꆱꆲꆳꆴꆵꆶꆷꆸꆹꆺꆻꆼꆽꆾꆿꇀꇁꇂꇃꇄꇅꇆꇇꇈꇉꇊꇋꇌꇍꇎꇏꇐꇑꇒꇓꇔꇕꇖꇗꇘꇙꇚꇛꇜꇝꇞꇟꇠꇡꇢꇣꇤꇥꇦꇧꇨꇩꇪꇫꇬꇭꇮꇯꇰꇱꇲꇳꇴꇵꇶꇷꇸꇹꇺꇻꇼꇽꇾꇿꈀꈁꈂꈃꈄꈅꈆꈇꈈꈉꈊꈋꈌꈍꈎꈏꈐꈑꈒꈓꈔꈕꈖꈗꈘꈙꈚꈛꈜꈝꈞꈟꈠꈡꈢꈣꈤꈥꈦꈧꈨꈩꈪꈫꈬꈭꈮꈯꈰꈱꈲꈳꈴꈵꈶꈷꈸꈹꈺꈻꈼꈽꈾꈿꉀꉁꉂꉃꉄꉅꉆꉇꉈꉉꉊꉋꉌꉍꉎꉏꉐꉑꉒꉓꉔꉕꉖꉗꉘꉙꉚꉛꉜꉝꉞꉟꉠꉡꉢꉣꉤꉥꉦꉧꉨꉩꉪꉫꉬꉭꉮꉯꉰꉱꉲꉳꉴꉵꉶꉷꉸꉹꉺꉻꉼꉽꉾꉿꊀꊁꊂꊃꊄꊅꊆꊇꊈꊉꊊꊋꊌꊍꊎꊏꊐꊑꊒꊓꊔꊕꊖꊗꊘꊙꊚꊛꊜꊝꊞꊟꊠꊡꊢꊣꊤꊥꊦꊧꊨꊩꊪꊫꊬꊭꊮꊯꊰꊱꊲꊳꊴꊵꊶꊷꊸꊹꊺꊻꊼꊽꊾꊿꋀꋁꋂꋃꋄꋅꋆꋇꋈꋉꋊꋋꋌꋍꋎꋏꋐꋑꋒꋓꋔꋕꋖꋗꋘꋙꋚꋛꋜꋝꋞꋟꋠꋡꋢꋣꋤꋥꋦꋧꋨꋩꋪꋫꋬꋭꋮꋯꋰꋱꋲꋳꋴꋵꋶꋷꋸꋹꋺꋻꋼꋽꋾꋿꌀꌁꌂꌃꌄꌅꌆꌇꌈꌉꌊꌋꌌꌍꌎꌏꌐꌑꌒꌓꌔꌕꌖꌗꌘꌙꌚꌛꌜꌝꌞꌟꌠꌡꌢꌣꌤꌥꌦꌧꌨꌩꌪꌫꌬꌭꌮꌯꌰꌱꌲꌳꌴꌵꌶꌷꌸꌹꌺꌻꌼꌽꌾꌿꍀꍁꍂꍃꍄꍅꍆꍇꍈꍉꍊꍋꍌꍍꍎꍏꍐꍑꍒꍓꍔꍕꍖꍗꍘꍙꍚꍛꍜꍝꍞꍟꍠꍡꍢꍣꍤꍥꍦꍧꍨꍩꍪꍫꍬꍭꍮꍯꍰꍱꍲꍳꍴꍵꍶꍷꍸꍹꍺꍻꍼꍽꍾꍿꎀꎁꎂꎃꎄꎅꎆꎇꎈꎉꎊꎋꎌꎍꎎꎏꎐꎑꎒꎓꎔꎕꎖꎗꎘꎙꎚꎛꎜꎝꎞꎟꎠꎡꎢꎣꎤꎥꎦꎧꎨꎩꎪꎫꎬꎭꎮꎯꎰꎱꎲꎳꎴꎵꎶꎷꎸꎹꎺꎻꎼꎽꎾꎿꏀꏁꏂꏃꏄꏅꏆꏇꏈꏉꏊꏋꏌꏍꏎꏏꏐꏑꏒꏓꏔꏕꏖꏗꏘꏙꏚꏛꏜꏝꏞꏟꏠꏡꏢꏣꏤꏥꏦꏧꏨꏩꏪꏫꏬꏭꏮꏯꏰꏱꏲꏳꏴꏵꏶꏷꏸꏹꏺꏻꏼꏽꏾꏿꐀꐁꐂꐃꐄꐅꐆꐇꐈꐉꐊꐋꐌꐍꐎꐏꐐꐑꐒꐓꐔꐕꐖꐗꐘꐙꐚꐛꐜꐝꐞꐟꐠꐡꐢꐣꐤꐥꐦꐧꐨꐩꐪꐫꐬꐭꐮꐯꐰꐱꐲꐳꐴꐵꐶꐷꐸꐹꐺꐻꐼꐽꐾꐿꑀꑁꑂꑃꑄꑅꑆꑇꑈꑉꑊꑋꑌꑍꑎꑏꑐꑑꑒꑓꑔꑕꑖꑗꑘꑙꑚꑛꑜꑝꑞꑟꑠꑡꑢꑣꑤꑥꑦꑧꑨꑩꑪꑫꑬꑭꑮꑯꑰꑱꑲꑳꑴꑵꑶꑷꑸꑹꑺꑻꑼꑽꑾꑿꒀꒁꒂꒃꒄꒅꒆꒇꒈꒉꒊꒋꒌ',
    ];
    charArrs = [];
    raindrops: MatrixRaindrop[] = [];

    private maxColumns = 0;
    private mutationObserver: MutationObserver;
    private resizeObserver: ResizeObserver;
    // Placeholder method that
    private performCanvasShift: Function = () => { /* NOP */ };
    private lastFrameTime = Date.now();
    private stopAnimation = false; // Interrupt any active animation (used as a safety)
    private hasCreatedCanvas = false;

    /**
     * 
     * @param selector CSS Selector or HTML element that we bootstrap the canvas onto
     * @param options Configuration options
     */
    constructor(
        selector: string | HTMLElement,
        public options: MatrixAnimationOptions = {}
    ) {
        this.setDefaultOptions();

        if (typeof selector == "string") {
            let el = document.querySelector(selector);
            if (!el) {
                throw new Error("No element matching selector \"" + selector + "\"");
            }
            if (el.nodeName == "CANVAS") {
                this.container = el.parentElement;
            }
            else {
                this.container = el as HTMLElement;
            }
        }
        else if (selector instanceof HTMLElement) {
            if (selector.nodeName == "CANVAS") {
                this.container = selector.parentElement;
            }
            else {
                this.container = selector as HTMLElement;
            }   
        }
        else {
            const error = new Error("Invalid selector passed to MatrixAnimation");
            error['selector'] = selector;
            error['options'] = options;
            throw error;
        }

        let canvas = this.container.querySelector("canvas");
        
        if (!canvas) {
            this.hasCreatedCanvas = true;
            canvas = document.createElement("canvas");
            this.container.append(canvas);
        }
        this._canvas = canvas;

        // TODO: this might need to be changed?
        if (getComputedStyle(this.container).position == 'static') {
            this.container.style.position = "relative";
        }
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.position = "absolute";


        this.resizeObserver = new ResizeObserver(() => this.onResize());
        this.resizeObserver.observe(this.container);

        // Watch the DOM tree -- if the contianer or canvas is destroyed
        // then we kill the animation
        this.mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                const removed = [...m.removedNodes.values()];
                if (removed.includes(this.container) || removed.includes(this.canvas)) {
                    this.dispose();
                }
            })
        });
        this.mutationObserver.observe(this.container, { childList: true });

        // Spread operator correctly serializes unicode
        this.charLists.forEach(list => {
            this.charArrs.push([...list]);
        });

        this.initCanvasShift();
        this.initCanvas();
        if (this.options.autoStart != false) {
            this.render();
        } 
    }

    /**
     * Remove all event listeners and dispose of all objects from memory.
     */
    dispose() {
        this.pause();
        this.resizeObserver.disconnect();
        this.mutationObserver.disconnect();

        if (this.hasCreatedCanvas) {
            this.canvas.remove();
        }
    }

    /**
     * Resume the animation from the 'paused' state
     */
    play() {
        this.stopAnimation = false;
        this.render();
    }

    /**
     * Pause the animation.
     */
    pause() {
        this.stopAnimation = true;
        cancelAnimationFrame(this.frameId);
    }

    /**
     * Handle resize events.
     * The component uses a ResizeObserver, so this should rarely need to be called.
     */
    onResize(refreshRain = true) {
        // Negative if shrunk, 0 if unchanged, positive if grown
        const widthChange = this.container.clientWidth - this.canvasWidth;
        const heightChange = this.container.clientHeight - this.canvasHeight;

        this.canvas.width = this.canvasWidth = this.container.clientWidth;
        this.canvas.height = this.canvasHeight = this.container.clientHeight;

        this.maxColumns = this.canvasWidth / (this.options.rainWidth);

        if (refreshRain) {
            if (widthChange > 0) {
                this.createRaindrops(true);
            }
            if (widthChange < 0) {
                // Remove all the cut-off rain
                this.raindrops = this.raindrops.filter(r => r.x < this.canvasWidth);
            }
            if (heightChange > 0) {
                // TBD.
            }
            if (heightChange < 0) {
                // Remove all the cut-off rain
                this.raindrops = this.raindrops.filter(r => r.x < this.canvasWidth);
            }

            // this.createRaindrops();
    
            // // Preemptively draw the characters
            // for (let i = 0; i < this.options.warmupIterations; i++)
            //     this.drawRain();
        }
    }

    private setDefaultOptions() {
        if (typeof this.options != "object")
            throw new Error("Options must be an object");

        this.options.rainWidth = this.options.rainWidth ?? 12;
        this.options.minFrameTime = this.options.minFrameTime ?? 50;
    }

    private initCanvasShift() {
        switch (this.options.windDirection) {
            case "LR": {
                this.performCanvasShift = () => {
                    this.ctx.globalCompositeOperation = "copy";
                    this.ctx.drawImage(this.ctx.canvas, this.options.windSpeed, 0);
                    // reset back to normal for subsequent operations.
                    this.ctx.globalCompositeOperation = "source-over";
                };
                break;
            }
            case "BU": {
                this.performCanvasShift = () => {
                    this.ctx.globalCompositeOperation = "copy";
                    this.ctx.drawImage(this.ctx.canvas, 0, -this.options.windSpeed);
                    // reset back to normal for subsequent operations.
                    this.ctx.globalCompositeOperation = "source-over";
                };
                break;
            }
            case "RL": {
                this.performCanvasShift = () => {
                    this.ctx.globalCompositeOperation = "copy";
                    this.ctx.drawImage(this.ctx.canvas, -this.options.windSpeed, 0);
                    // reset back to normal for subsequent operations.
                    this.ctx.globalCompositeOperation = "source-over";
                };
                break;
            }
            case "TD": {
                this.performCanvasShift = () => {
                    this.ctx.globalCompositeOperation = "copy";
                    this.ctx.drawImage(this.ctx.canvas, 0, this.options.windSpeed);
                    // reset back to normal for subsequent operations.
                    this.ctx.globalCompositeOperation = "source-over";
                };
                break;
            }
        }
    }

    private initCanvas() {
        this.onResize(false);

        this.createRaindrops();

        this.ctx.shadowColor = this.options.bloomColor ?? "#0000";
        this.ctx.imageSmoothingEnabled = false;

        // Preemptively draw the characters
        for (let i = 0; i < this.options.warmupIterations; i++)
            this.drawRain();
    }

    private createRaindrops(add = false) {
        // If we aren't adding more rain, we're resetting things.
        if (!add) {
            this.raindrops.splice(0);
        }

        let startIndex = add ? this.raindrops.length : 0;

        // Randomly place raindrops on the canvas
        // 50% distributon top to bottom to smoothen
        // bias on the random number generator
        for (var i = startIndex; i < this.maxColumns; i++) {
            this.raindrops.push(
                new MatrixRaindrop(
                    i * this.options.rainWidth,
                    randomFloat(0, this.canvasHeight / 2),
                    this,
                    this.options.rainDrop
                ),
                new MatrixRaindrop(
                    i * this.options.rainWidth,
                    randomFloat(this.canvasHeight / 2, this.canvasHeight),
                    this,
                    this.options.rainDrop
                )
            );
        }
    }

    // Context bound to this class
    private render = (() => {
        if (this.stopAnimation) return;

        const t = Date.now();
        const d = t - this.lastFrameTime;

        if (d > this.options.minFrameTime) {
            this.lastFrameTime = t;
            this.drawRain();
        }

        this.frameId = requestAnimationFrame(this.render);
    }).bind(this);

    private drawRain() {
        let i = this.raindrops.length;

        this.ctx.shadowColor = this.options.bloomColor;
        this.ctx.shadowBlur = this.options.bloomSize;

        // Call clear before we apply the fade fill
        while (i--) {
            this.raindrops[i].clear(this.ctx);
        }

        this.ctx.shadowBlur = 0;
        this.performCanvasShift();

        // Fade everything slightly
        this.ctx.fillStyle = `rgba(0,0,0,${this.options.fadeStrength ?? 0.05})`;
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw the new characters
        i = this.raindrops.length;

        this.ctx.shadowColor = this.options.bloomColor;
        this.ctx.shadowBlur = this.options.bloomSize;

        while (i--) {
            this.raindrops[i].draw(this.ctx);
        }
    }
}

class MatrixRaindrop {
    private charList: string[];
    previousChar: string;
    previousX: number;
    previousY: number;

    private shiftDirection: Function;
    private xSpeed = 0;

    constructor(
        public x: number,
        public y: number,
        private matrixAnimation: MatrixAnimation,
        private config: MatrixAnimationRaindropOptions = {}
    ) {
        this.randomizeChars();

        // this.xSpeed = config.xSpeed;
        this.initMoveDirection();
    }

    initMoveDirection() {
        switch (this.config.direction) {
            case "LR": {
                this.shiftDirection = () => {
                    this.x += randomFloat(4, 12);
                    if (this.x > this.matrixAnimation.canvasWidth) {
                        this.randomizeChars();

                        this.x = randomFloat(-100, 0);
                    }
                };
                break;
            }
            case "BU": {
                this.shiftDirection = () => {
                    this.y -= randomFloat(4, 12);
                    if (this.y < 0) {
                        this.randomizeChars();

                        this.y = randomFloat(0, this.matrixAnimation.canvasHeight + 100);
                    }
                };
                break;
            }
            case "RL": {
                this.shiftDirection = () => {
                    this.x -= randomFloat(4, 12);
                    if (this.x < 0) {
                        this.randomizeChars();

                        this.x = randomFloat(0, this.matrixAnimation.canvasWidth + 100);
                    }
                };
                break;
            }
            case "TD":
            default: {
                this.shiftDirection = () => {
                    this.y += randomFloat(4, 12);
                    if (this.y > this.matrixAnimation.canvasHeight) {
                        this.randomizeChars();

                        this.y = randomFloat(-100, 0);
                        // this.xSpeed = config.xSpeed;
                    }
                };
                break;
            }
        }
    }

    randomizeChars() {
        this.charList = this.matrixAnimation.charArrs[~~(Math.random() * this.matrixAnimation.charArrs.length)];
    }

    clear(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = (this.config.trailColors && this.config.trailColors[randomInt(0, this.config.trailColors.length)])
            ?? this.config.trailColor
            ?? "rgba(140,62,225,1)";

        ctx.font = (this.config.fontSize ?? 14) + "px " + (this.config.fontFamily ?? "Arial");
        ctx.fillText(this.previousChar, this.previousX, this.previousY);
    }

    draw(ctx: CanvasRenderingContext2D) {
        const char = this.previousChar =
            this.config.charArray
                ? this.config.charArray[randomInt(0, this.config.charArray.length - 1)]
                : this.charList[randomInt(0, this.charList.length - 1)];

        ctx.fillStyle = this.config.headColor ?? "rgba(255,255,255,0.8)";
        ctx.font = (this.config.fontSize ?? 14) + "px " + (this.config.fontFamily ?? "Arial");
        ctx.fillText(char, this.x, this.y);

        this.previousX = this.x;
        this.previousY = this.y;

        if (this.xSpeed) {
            this.xSpeed = Math.max(this.xSpeed - .05, 0);

            this.x += this.xSpeed ?? 0;

            if (this.x > this.matrixAnimation.canvasWidth) {
                this.x = randomInt(-20, 0);
            }
        }

        this.shiftDirection();
    };
}