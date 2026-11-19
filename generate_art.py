from pathlib import Path
import random, math
out=Path(__file__).parent/'public'/'assets'
out.mkdir(exist_ok=True)

def base(name, top, middle, bottom, scene, stars='', extras=''):
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="720" height="940" viewBox="0 0 720 940" role="img" aria-label="Original {name} poster artwork">
<defs>
  <linearGradient id="sky" x1="0" x2="0.8" y1="0" y2="1"><stop stop-color="{top}"/><stop offset=".55" stop-color="{middle}"/><stop offset="1" stop-color="{bottom}"/></linearGradient>
  <radialGradient id="glow"><stop stop-color="#fff7df" stop-opacity=".92"/><stop offset=".2" stop-color="#ffdbb2" stop-opacity=".64"/><stop offset=".58" stop-color="#ffb77c" stop-opacity=".22"/><stop offset="1" stop-color="#ffb77c" stop-opacity="0"/></radialGradient>
  <radialGradient id="blueglow"><stop stop-color="#a6efff" stop-opacity=".85"/><stop offset=".3" stop-color="#69c6ff" stop-opacity=".34"/><stop offset="1" stop-color="#69c6ff" stop-opacity="0"/></radialGradient>
  <linearGradient id="mist" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#ffffff" stop-opacity=".0"/><stop offset="1" stop-color="#ffffff" stop-opacity=".19"/></linearGradient>
  <linearGradient id="shade" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#000000" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity=".7"/></linearGradient>
  <filter id="blur"><feGaussianBlur stdDeviation="28"/></filter>
  <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".64" numOctaves="3" stitchTiles="stitch" result="noise"/><feColorMatrix in="noise" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".055"/></feComponentTransfer></filter>
</defs>
<rect width="720" height="940" fill="url(#sky)"/>{stars}{scene}{extras}<rect width="720" height="940" filter="url(#grain)" opacity=".24"/><rect y="580" width="720" height="360" fill="url(#shade)"/>
<path d="M48 53h39M48 53v39M672 53h-39M672 53v39" fill="none" stroke="#ffffff" stroke-opacity=".4" stroke-width="2"/>
<text x="52" y="883" fill="#ffffff" fill-opacity=".5" font-family="Arial, sans-serif" font-size="12" letter-spacing="5">CINEVA ORIGINAL</text>
<text x="668" y="883" fill="#ffffff" fill-opacity=".5" font-family="Arial, sans-serif" font-size="12" text-anchor="end" letter-spacing="2">2026</text>
</svg>'''
    (out/f'{name}.svg').write_text(svg, encoding='utf-8')

random.seed(6)
stars=''.join(f'<circle cx="{random.randrange(20,700)}" cy="{random.randrange(50,780)}" r="{random.choice([.7,1,1.2,1.6,2])}" fill="#d5edff" opacity="{random.uniform(.25,.85):.2f}"/>' for _ in range(125))
nebula='''<ellipse cx="412" cy="350" rx="335" ry="295" fill="url(#blueglow)"/>
<circle cx="490" cy="305" r="183" fill="#a7d1ee" opacity=".1"/><circle cx="490" cy="305" r="150" fill="#6094bc"/>
<path d="M364 239C426 180 554 196 617 258 556 230 518 273 476 271c-54-2-89-25-112-32Z" fill="#94dfff" opacity=".56"/>
<path d="M352 333c54-7 109 62 164 36 43-21 86-17 126-5-32 72-87 106-158 104-59-2-101-55-132-135Z" fill="#0c3e70" opacity=".65"/>
<ellipse cx="479" cy="321" rx="249" ry="51" transform="rotate(-25 479 321)" fill="none" stroke="#caecff" stroke-width="8" opacity=".56"/>
<ellipse cx="479" cy="321" rx="263" ry="57" transform="rotate(-25 479 321)" fill="none" stroke="#88ceee" stroke-width="2" opacity=".7"/>
<path d="M0 755 115 665 204 704 317 615 428 681 539 621 720 716V940H0Z" fill="#13273d"/>
<path d="M0 847 135 775 264 832 388 740 529 825 625 776 720 813V940H0Z" fill="#081726"/>
<path d="M286 820v-74h-13l-7-17 15-22 15 22-7 17h-3v74Z" fill="#040d1b"/>
<path d="M273 777 250 828h63l-25-51Z" fill="#040d1b"/>
<path d="m282 701 1-40" stroke="#9ad9ff" stroke-width="2" opacity=".6"/>'''
base('nebula','#030c25','#123b5c','#111f38',nebula,stars)

random.seed(11)
rain=''.join(f'<path d="M{x} {y} l-9 25" stroke="#a5bbdb" opacity="{random.uniform(.05,.25):.2f}" stroke-width="1.6"/>' for x,y in [(random.randrange(720),random.randrange(780)) for i in range(85)])
city=''
random.seed(12)
for idx,x in enumerate(range(-35,730,60)):
    height=random.randint(190,430);y=755-height;w=random.randint(48,72)
    city+=f'<rect x="{x}" y="{y}" width="{w}" height="{height+185}" fill="{["#181d34","#121c31","#1d2137"][idx%3]}"/>'
    for yy in range(y+17,735,27):
        for xx in range(x+10,x+w-5,17):
            if random.random()>.47:city+=f'<rect x="{xx}" y="{yy}" width="5" height="9" fill="{random.choice(["#e78792","#ffe7a4","#c8bde8"])}" opacity=".5"/>'
midnight='''<circle cx="497" cy="287" r="206" fill="url(#glow)"/><circle cx="497" cy="288" r="117" fill="#f17c80" opacity=".8"/>
<rect x="0" y="510" width="720" height="360" fill="#202942" opacity=".3"/>'''+city+'''<path d="M0 760 310 666h116L720 760v180H0Z" fill="#0b1020"/><path d="M350 696 355 940M366 696l19 244" stroke="#ffab76" stroke-width="5" opacity=".8"/>
<path d="M148 790 252 762h221l94 28-6 63H161Z" fill="#0b111d" stroke="#ff4e69" stroke-width="3"/>
<path d="M258 765 298 727h118l48 37Z" fill="#141d2d" stroke="#ff4e69" stroke-width="3"/>
<path d="M175 845h65m242 0h65" stroke="#ff475e" stroke-width="14" stroke-linecap="round"/>'''
base('midnight','#1d1029','#843747','#171724',midnight,rain)

random.seed(7)
flecks=''.join(f'<circle cx="{random.randint(10,710)}" cy="{random.randint(120,720)}" r="{random.randint(1,3)}" fill="#fbead2" opacity="{random.uniform(.2,.6):.2f}"/>' for _ in range(45))
echo='''<circle cx="423" cy="348" r="272" fill="url(#glow)"/><circle cx="423" cy="347" r="150" fill="#ffcd92" opacity=".88"/>
<path d="M0 575C164 484 218 552 338 500c148-64 256-27 382-113v553H0Z" fill="#b85b63" opacity=".78"/>
<path d="M0 648c143-104 267-66 359-96 111-36 239-34 361-106v494H0Z" fill="#773f55"/>
<path d="M0 711c159-40 259-3 342-55 106-65 211-28 378-70v354H0Z" fill="#392a45"/>
<path d="M289 757v-233c0-47 39-86 87-86s87 39 87 86v233" stroke="#edd0b4" stroke-width="28" fill="none" opacity=".7"/>
<path d="M323 745v-207c0-31 22-55 53-55s53 24 53 55v207" fill="#593c55"/>
<path d="M357 699c10-28 33-29 45 0l10 86h-65Z" fill="#1e2034"/>
<circle cx="381" cy="669" r="20" fill="#1e2034"/>
<path d="M0 805c206-44 350-19 501-5 73 6 148 2 219-11v151H0Z" fill="#1c1c32"/>'''
base('echo','#392749','#db7f7d','#552d4d',echo,flecks)

random.seed(2)
lines=''.join(f'<path d="M{x} 100v{random.randint(250,610)}" stroke="#bc8dfe" opacity="{random.uniform(.08,.35):.2f}" stroke-width="{random.choice([1,2,3])}"/>' for x in range(24,720,20))
shadow='''<ellipse cx="390" cy="320" rx="320" ry="340" fill="url(#blueglow)" opacity=".7"/>
<path d="M85 330c180-195 386-204 557-13-170 195-376 202-557 13Z" fill="none" stroke="#e3b1ff" stroke-width="12" opacity=".7"/>
<path d="M155 333c131-125 307-128 422-5-143 123-285 129-422 5Z" fill="#211f48" stroke="#8bbdfb" stroke-width="2"/>
<circle cx="368" cy="327" r="100" fill="#5c58a7"/><circle cx="368" cy="327" r="58" fill="#141b38"/>
<circle cx="389" cy="306" r="17" fill="#dcd3ff" opacity=".95"/>
<path d="M0 689c134-101 255-88 353-39 122-74 226-58 367-11v301H0Z" fill="#17152f"/>
<path d="M258 811c11-158 25-229 99-254 80 25 105 96 109 254H258Z" fill="#080e24" stroke="#424265" stroke-width="2"/>
<path d="M280 669c32-44 137-44 165 0" fill="none" stroke="#7865b1" stroke-width="3" opacity=".56"/>
<path d="M293 809h159" stroke="#9996e2" opacity=".4"/>'''
base('shadow','#14142c','#34265b','#101326',shadow,lines)

random.seed(2)
bubbles=''.join(f'<circle cx="{random.randrange(15,710)}" cy="{random.randrange(160,760)}" r="{random.randint(2,9)}" fill="none" stroke="#9cf8fa" stroke-width="1.4" opacity="{random.uniform(.12,.5):.2f}"/>' for _ in range(70))
blue='''<ellipse cx="417" cy="80" rx="370" ry="350" fill="url(#blueglow)"/>
<path d="M0 260c145 35 216 36 360-2 131-36 257-28 360-1" fill="none" stroke="#b1fff2" stroke-width="9" opacity=".5"/>
<path d="M330 0 190 710M400 0l22 680M448 0l183 710" stroke="#a0f4e7" stroke-width="49" opacity=".045"/>
<path d="M0 745c93-18 166-11 230 12 144-64 240-35 321-14 67-29 110-20 169-5v202H0Z" fill="#123a4e"/>
<path d="M0 800c111-34 204-26 324-1 167-35 247-30 396-8v149H0Z" fill="#0a2b3c"/>
<path d="M113 824c13-55 7-80-15-124m20 126c27-43 31-74 23-107m473 99c-8-44-5-64 17-104m-23 97c-30-31-34-52-35-76" fill="none" stroke="#6dbab1" stroke-width="9" opacity=".5"/>
<path d="M338 459c10-19 41-16 48 0l-11 30-35-1Zm1 32h39l27 94-32 8-14-46-13 55-33-6Z" fill="#051e2c"/>
<path d="M364 573c-37 27-59 32-99 25m130-27 91 34" stroke="#051e2c" stroke-width="17" stroke-linecap="round"/>
<circle cx="362" cy="446" r="27" fill="#051e2c"/>
<circle cx="367" cy="444" r="15" fill="#9ddce7" opacity=".6"/>'''
base('blue','#042a48','#137882','#053c52',blue,bubbles)

random.seed(3)
sunspots=''.join(f'<circle cx="{random.randrange(100,620)}" cy="{random.randrange(70,480)}" r="{random.randrange(2,5)}" fill="#ffe3a1" opacity="{random.uniform(.09,.25):.2f}"/>' for _ in range(40))
solstice='''<circle cx="358" cy="328" r="309" fill="url(#glow)"/>
<circle cx="359" cy="341" r="185" fill="#ffe6ad"/>
<circle cx="359" cy="341" r="172" fill="#ffcc78" opacity=".8"/>
<path d="M0 570c154-42 297-77 424-12 98 50 220 16 296-13v395H0Z" fill="#a9635a"/>
<path d="M0 680c164-121 321-51 412-46 109 7 205-46 308-65v371H0Z" fill="#7d4a51"/>
<path d="M0 785c114-65 211-77 345-41 155 42 233-24 375-51v247H0Z" fill="#3e2d41"/>
<path d="M262 759c31-126 55-206 96-253 46 67 81 150 104 253H262Z" fill="#232638"/>
<path d="M341 566h35m-18-18v44" stroke="#ffc578" stroke-width="4" opacity=".7"/>
<path d="M0 853c144-54 261-6 370-30 175-37 244 2 350-16v133H0Z" fill="#202234"/>'''
base('solstice','#4b2c43','#c27669','#3a304b',solstice,sunspots)

(out/'favicon.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#101722"/><path d="M10 19 32 6l22 13v26L32 58 10 45V19Z" stroke="#ffca76" stroke-width="4" fill="none"/><path d="m25 21 19 11-19 11V21Z" fill="#ffca76"/></svg>''')
print('Created:', *(p.name for p in sorted(out.iterdir())))
