/*
 * 문제 은행 (questions.js)
 * 출처: 화학Ⅱ 학습지 1~10차시 (엔탈피 / 헤스 법칙 / 엔트로피 / 반응 속도 / 활성화 에너지 / 촉매)
 *
 * 문제 추가 방법
 *  - O/X  : { type:'ox', lesson:'N차시', q:'...', answer:true|false, explanation:'...' }
 *  - 객관식: { type:'mc', lesson:'N차시', q:'...', choices:['...','...'], answer:정답 인덱스(0부터),
 *             explanation:'...', keepOrder:true }   ← keepOrder:true 이면 보기 순서를 섞지 않음
 *  - q, choices, explanation 안에는 <sub> <sup> 같은 간단한 HTML을 쓸 수 있습니다.
 */
const QUESTIONS = [
  /* ===================== O / X ===================== */
  {
    type: 'ox', lesson: '1차시',
    q: '발열 반응은 주위로 열을 방출하는 반응이므로, 반응이 일어나면 주위의 온도가 높아진다.',
    answer: true,
    explanation: '발열 반응은 반응물의 엔탈피 합이 생성물의 엔탈피 합보다 커서 그 차이만큼 열을 <b>방출</b>합니다(ΔH &lt; 0). 방출된 열 때문에 주위의 온도는 높아집니다.'
  },
  {
    type: 'ox', lesson: '1차시',
    q: '흡열 반응에서는 반응물이 가진 엔탈피의 합이 생성물이 가진 엔탈피의 합보다 크다.',
    answer: false,
    explanation: 'ΔH = (생성물의 엔탈피 합) − (반응물의 엔탈피 합) 입니다. 흡열 반응은 ΔH &gt; 0 이므로 <b>생성물</b>의 엔탈피 합이 반응물보다 큽니다.'
  },
  {
    type: 'ox', lesson: '1차시',
    q: 'H<sub>2</sub>(g) + ½O<sub>2</sub>(g) → H<sub>2</sub>O(g)의 ΔH = −241.8 kJ 일 때, 2H<sub>2</sub>(g) + O<sub>2</sub>(g) → 2H<sub>2</sub>O(g)의 ΔH도 −241.8 kJ 이다.',
    answer: false,
    explanation: '반응 엔탈피는 반응 계수에 비례합니다. 계수가 2배가 되면 ΔH도 2배가 되어 <b>−483.6 kJ</b> 입니다.'
  },
  {
    type: 'ox', lesson: '1차시',
    q: 'H<sub>2</sub>(g) + ½O<sub>2</sub>(g) → H<sub>2</sub>O(g)의 ΔH = −241.8 kJ 일 때, 역반응 H<sub>2</sub>O(g) → H<sub>2</sub>(g) + ½O<sub>2</sub>(g)의 ΔH는 +241.8 kJ 이다.',
    answer: true,
    explanation: '역반응의 반응 엔탈피는 정반응과 <b>절댓값은 같고 부호는 반대</b>입니다.'
  },
  {
    type: 'ox', lesson: '2차시',
    q: '결합 에너지는 결합을 끊는 데 필요한 에너지이므로 항상 양(+)의 값을 가진다.',
    answer: true,
    explanation: '결합을 끊으려면 에너지를 흡수해야 하므로 결합 에너지는 항상 양(+)의 값입니다. 반대로 결합이 형성될 때는 같은 크기의 에너지가 방출됩니다.'
  },
  {
    type: 'ox', lesson: '3차시',
    q: '반응물과 생성물의 종류와 상태가 같다면, 반응 경로가 달라도 전체 반응 엔탈피 변화의 합은 일정하다.',
    answer: true,
    explanation: '이것이 <b>헤스 법칙(총열량 불변의 법칙)</b>입니다. 예) ΔH<sub>1</sub> = ΔH<sub>2</sub> + ΔH<sub>3</sub>'
  },
  {
    type: 'ox', lesson: '4차시',
    q: '25℃, 1기압에서 C(s, 다이아몬드)의 표준 생성 엔탈피는 0 이다.',
    answer: false,
    explanation: '탄소의 가장 안정한 원소는 <b>C(s, 흑연)</b>이며 흑연의 표준 생성 엔탈피가 0 입니다. 다이아몬드는 1.9 kJ/mol 입니다.'
  },
  {
    type: 'ox', lesson: '4차시',
    q: '반응 엔탈피 ΔH° = Σ ΔH<sub>f</sub>°(생성물) − Σ ΔH<sub>f</sub>°(반응물) 이다.',
    answer: true,
    explanation: '반응 엔탈피는 <b>생성물의 생성 엔탈피 합에서 반응물의 생성 엔탈피 합을 뺀 값</b>과 같습니다.'
  },
  {
    type: 'ox', lesson: '5차시',
    q: '같은 물질의 엔트로피는 고체 &gt; 액체 &gt; 기체 순으로 크다.',
    answer: false,
    explanation: '무질서도는 S<sub>고체</sub> &lt; S<sub>액체</sub> ≪ S<sub>기체</sub> 입니다. 기체일 때 엔트로피가 가장 큽니다.'
  },
  {
    type: 'ox', lesson: '5차시',
    q: '닫힌계는 계와 주위 사이에 물질과 에너지를 모두 교환할 수 있다.',
    answer: false,
    explanation: '닫힌계는 <b>에너지 교환만 가능</b>하고 물질 교환은 불가능합니다. 물질과 에너지를 모두 교환하는 것은 열린계, 모두 교환하지 못하는 것은 고립계입니다.'
  },
  {
    type: 'ox', lesson: '5차시',
    q: '발열 반응이 일어나면 주위의 엔트로피는 증가한다 (ΔS<sub>주위</sub> &gt; 0).',
    answer: true,
    explanation: '주위가 열을 받으면 분자의 운동 에너지가 증가하고, 에너지가 분배될 수 있는 방법이 늘어나므로 주위의 엔트로피는 증가합니다.'
  },
  {
    type: 'ox', lesson: '7차시',
    q: '반응 속도식 v = k[A]<sup>m</sup>[B]<sup>n</sup> 에서 반응 차수 m, n은 반응식의 계수를 보고 알 수 있다.',
    answer: false,
    explanation: '반응 차수는 반응식의 계수와 관계없이 <b>실험을 통해서만</b> 구할 수 있습니다.'
  },
  {
    type: 'ox', lesson: '7차시',
    q: '반응 속도 상수(k)는 반응물의 농도가 증가하면 함께 증가한다.',
    answer: false,
    explanation: 'k는 반응 종류, <b>온도와 활성화 에너지</b>에 따라 달라지는 값으로, 농도와는 무관합니다.'
  },
  {
    type: 'ox', lesson: '8차시',
    q: '1차 반응에서 반응물의 초기 농도가 클수록 반감기는 길어진다.',
    answer: false,
    explanation: '1차 반응의 반감기는 초기 농도에 관계없이 <b>항상 일정</b>합니다.'
  },
  {
    type: 'ox', lesson: '10차시',
    q: '정촉매를 사용하면 활성화 에너지는 감소하지만 반응 엔탈피(ΔH)는 변하지 않는다.',
    answer: true,
    explanation: '정촉매는 활성화 에너지를 낮춰 반응 속도를 빠르게 하지만, 반응물과 생성물의 엔탈피는 그대로이므로 ΔH는 일정합니다.'
  },
  {
    type: 'ox', lesson: '10차시',
    q: '온도가 높아지면 활성화 에너지가 작아지기 때문에 반응 속도가 빨라진다.',
    answer: false,
    explanation: '온도가 높아져도 활성화 에너지(E<sub>a</sub>)는 <b>일정</b>합니다. 활성화 에너지 이상의 에너지를 가진 분자 수가 증가해서 반응 속도가 빨라지는 것입니다.'
  },

  /* ===================== 객관식 ===================== */
  {
    type: 'mc', lesson: '1차시',
    q: 'CaO(s) + H<sub>2</sub>O(l) → Ca(OH)<sub>2</sub>(aq) &nbsp; ΔH = −76.9 kJ<br>이 열화학 반응식에 대한 설명으로 옳은 것은?',
    choices: [
      'CaO 1 mol이 용해될 때 76.9 kJ의 열이 방출된다.',
      'CaO 1 mol이 용해될 때 76.9 kJ의 열을 흡수한다.',
      '반응이 일어나면 주위의 온도가 낮아진다.',
      '생성물의 엔탈피 합이 반응물의 엔탈피 합보다 크다.'
    ],
    answer: 0,
    explanation: 'ΔH &lt; 0 이므로 발열 반응입니다. CaO 1 mol이 용해될 때 76.9 kJ의 열이 방출되고, 주위의 온도는 높아지며, 반응물의 엔탈피 합이 생성물보다 큽니다.'
  },
  {
    type: 'mc', lesson: '1차시',
    q: 'NH<sub>4</sub>NO<sub>3</sub>(s) → NH<sub>4</sub>NO<sub>3</sub>(aq) &nbsp; ΔH = +26.2 kJ<br>이 반응에 대한 설명으로 옳은 것은?',
    choices: [
      '발열 반응이며 주위의 온도가 높아진다.',
      '흡열 반응이며 NH<sub>4</sub>NO<sub>3</sub> 1 mol이 용해될 때 26.2 kJ의 열을 흡수한다.',
      '흡열 반응이며 생성물의 엔탈피 합이 반응물보다 작다.',
      '발열 반응이며 NH<sub>4</sub>NO<sub>3</sub> 1 mol이 용해될 때 26.2 kJ의 열이 방출된다.'
    ],
    answer: 1,
    explanation: 'ΔH &gt; 0 이므로 흡열 반응입니다. 열을 흡수하므로 주위의 온도는 낮아지고, 생성물의 엔탈피 합이 반응물보다 큽니다.'
  },
  {
    type: 'mc', lesson: '1차시',
    q: '다음은 연료 1 mol이 완전 연소할 때 방출하는 열에너지와 분자량이다.<br>CH<sub>4</sub> : 890.5 kJ (16) &nbsp;/&nbsp; C<sub>4</sub>H<sub>10</sub> : 2877 kJ (58) &nbsp;/&nbsp; C<sub>2</sub>H<sub>5</sub>OH : 1367 kJ (46) &nbsp;/&nbsp; H<sub>2</sub> : 285.8 kJ (2)<br><b>일정한 질량(g)</b>을 기준으로 연료의 효율이 가장 높은 것은?',
    choices: ['CH<sub>4</sub>', 'C<sub>4</sub>H<sub>10</sub>', 'C<sub>2</sub>H<sub>5</sub>OH', 'H<sub>2</sub>'],
    answer: 3,
    keepOrder: true,
    explanation: '1 g당 방출 열에너지 = (1 mol당 열) ÷ 분자량 입니다.<br>CH<sub>4</sub> 55.7 / C<sub>4</sub>H<sub>10</sub> 49.6 / C<sub>2</sub>H<sub>5</sub>OH 29.7 / H<sub>2</sub> <b>142.9 kJ</b> → H<sub>2</sub>가 가장 높습니다. (1 mol 기준이면 C<sub>4</sub>H<sub>10</sub>이 가장 높음)'
  },
  {
    type: 'mc', lesson: '2차시',
    q: '25℃, 1기압에서 O<sub>2</sub>F<sub>2</sub>(g)이 O<sub>2</sub>(g)과 F<sub>2</sub>(g)으로 분해되는 반응<br>F−O−O−F → O=O + F−F &nbsp; ΔH = x kJ<br>결합 에너지(kJ/mol)가 O−O = 180, O=O = 498, F−F = 159, O−F = a 일 때 x는?',
    choices: ['2a − 477', '2a + 477', 'a − 477', '2a − 159', '477 − 2a'],
    answer: 0,
    keepOrder: true,
    explanation: 'ΔH = (끊는 결합 에너지 합) − (형성되는 결합 에너지 합)<br>끊는 결합: O−F 2개(2a) + O−O 1개(180) / 형성: O=O(498) + F−F(159)<br>x = (2a + 180) − (498 + 159) = <b>2a − 477</b>'
  },
  {
    type: 'mc', lesson: '2차시',
    q: 'H<sub>2</sub>(g) → 2H(g) &nbsp; ΔH = 436 kJ<br>Cl<sub>2</sub>(g) → 2Cl(g) &nbsp; ΔH = 243 kJ<br>이에 대한 설명으로 옳은 것은?',
    choices: [
      'H−H 결합이 Cl−Cl 결합보다 강하다.',
      'Cl−Cl 결합이 H−H 결합보다 강하다.',
      '두 결합의 세기는 같다.',
      'Cl<sub>2</sub>의 결합을 끊을 때는 에너지가 방출된다.'
    ],
    answer: 0,
    explanation: '결합 에너지가 클수록 결합이 강합니다. 436 kJ &gt; 243 kJ 이므로 H−H 결합이 더 강하고, 결합을 끊을 때는 항상 에너지를 흡수합니다.'
  },
  {
    type: 'mc', lesson: '3차시',
    q: 'H<sub>2</sub>(g) + ½O<sub>2</sub>(g) → H<sub>2</sub>O(l) &nbsp; ΔH<sub>1</sub> = −285.8 kJ<br>H<sub>2</sub>(g) + ½O<sub>2</sub>(g) → H<sub>2</sub>O(g) &nbsp; ΔH<sub>2</sub> = −241.8 kJ<br>H<sub>2</sub>O(l) → H<sub>2</sub>O(g) &nbsp; ΔH<sub>3</sub> = x 일 때, 물의 기화 엔탈피 x는?',
    choices: ['+44 kJ', '−44 kJ', '+527.6 kJ', '−527.6 kJ'],
    answer: 0,
    keepOrder: true,
    explanation: '헤스 법칙에서 ΔH<sub>3</sub> = ΔH<sub>2</sub> − ΔH<sub>1</sub> = (−241.8) − (−285.8) = <b>+44 kJ</b> (기화는 흡열)'
  },
  {
    type: 'mc', lesson: '3차시',
    q: 'C(s, 흑연) + O<sub>2</sub>(g) → CO<sub>2</sub>(g) &nbsp; ΔH<sub>1</sub> = −393.5 kJ<br>CO(g) + ½O<sub>2</sub>(g) → CO<sub>2</sub>(g) &nbsp; ΔH<sub>2</sub> = −283.0 kJ<br>C(s, 흑연) + ½O<sub>2</sub>(g) → CO(g) &nbsp; ΔH<sub>3</sub> = x 일 때 x는?',
    choices: ['−110.5 kJ', '+110.5 kJ', '−676.5 kJ', '+676.5 kJ'],
    answer: 0,
    keepOrder: true,
    explanation: '목표 반응 = ① − ② 이므로 ΔH<sub>3</sub> = ΔH<sub>1</sub> − ΔH<sub>2</sub> = (−393.5) − (−283.0) = <b>−110.5 kJ</b>'
  },
  {
    type: 'mc', lesson: '3차시',
    q: '다음은 25℃, 1기압에서의 열화학 반응식이다.<br>① CH<sub>4</sub>(g) + Cl<sub>2</sub>(g) → CH<sub>3</sub>Cl(g) + HCl(g) &nbsp; ΔH = −98 kJ<br>② CH<sub>3</sub>Cl(g) + Cl<sub>2</sub>(g) → CH<sub>2</sub>Cl<sub>2</sub>(g) + HCl(g) &nbsp; ΔH = x kJ<br>③ CH<sub>4</sub>(g) + 2Cl<sub>2</sub>(g) → CH<sub>2</sub>Cl<sub>2</sub>(g) + 2HCl(g) &nbsp; ΔH = −202 kJ<br>x는?',
    choices: ['−104', '+104', '−300', '−202'],
    answer: 0,
    keepOrder: true,
    explanation: '③ = ① + ② 이므로 −202 = −98 + x → x = <b>−104</b>'
  },
  {
    type: 'mc', lesson: '4차시',
    q: '25℃, 1기압에서 표준 생성 엔탈피가 <b>0</b>인 물질은?',
    choices: ['O(g)', 'O<sub>3</sub>(g)', 'C(s, 다이아몬드)', 'C(s, 흑연)'],
    answer: 3,
    keepOrder: true,
    explanation: '가장 안정한 원소의 표준 생성 엔탈피는 0 입니다. 산소는 O<sub>2</sub>(g), 탄소는 C(s, 흑연)이 가장 안정하며 O(g)=249, O<sub>3</sub>(g)=143, 다이아몬드=1.9 kJ/mol 입니다.'
  },
  {
    type: 'mc', lesson: '4차시',
    q: '표준 생성 엔탈피(kJ/mol)가 CH<sub>4</sub>(g) = −74.8, CO<sub>2</sub>(g) = −393.5, H<sub>2</sub>O(l) = −285.8 일 때,<br>CH<sub>4</sub>(g) + 2O<sub>2</sub>(g) → CO<sub>2</sub>(g) + 2H<sub>2</sub>O(l) 의 반응 엔탈피(kJ)는?',
    choices: ['−890.3', '−604.5', '−1039.9', '+890.3'],
    answer: 0,
    keepOrder: true,
    explanation: 'ΔH = Σ(생성물) − Σ(반응물) = [(−393.5) + 2×(−285.8)] − [(−74.8) + 0] = <b>−890.3 kJ</b> (O<sub>2</sub>의 생성 엔탈피는 0)'
  },
  {
    type: 'mc', lesson: '5차시',
    q: '다음 중 엔트로피가 증가하는 변화는?',
    choices: [
      '물이 얼어서 얼음이 된다.',
      '수증기가 응축되어 물이 된다.',
      'N<sub>2</sub>(g) + 3H<sub>2</sub>(g) → 2NH<sub>3</sub>(g)',
      '얼음이 녹아서 물이 된다.'
    ],
    answer: 3,
    explanation: '고체 → 액체 → 기체로 갈수록 엔트로피가 증가합니다. 얼음이 녹는 변화는 고체 → 액체이므로 증가합니다. 나머지는 기체 분자 수 감소 또는 액체·고체 쪽으로 변하는 변화라 엔트로피가 감소합니다.'
  },
  {
    type: 'mc', lesson: '5차시',
    q: '25℃, 1기압의 닫힌계에서 메테인이 연소된다. CH<sub>4</sub>(g) + 2O<sub>2</sub>(g) → CO<sub>2</sub>(g) + 2H<sub>2</sub>O(l)<br>이때 <b>감소하는 값만</b> 있는 대로 고른 것은?<br>ㄱ. 계의 엔탈피 &nbsp; ㄴ. 주위의 온도 &nbsp; ㄷ. 주위의 엔트로피',
    choices: ['ㄱ', 'ㄴ', 'ㄷ', 'ㄱ, ㄴ', 'ㄴ, ㄷ'],
    answer: 0,
    keepOrder: true,
    explanation: '연소는 발열 반응입니다. 계의 엔탈피는 <b>감소</b>(ΔH &lt; 0)하고, 방출된 열을 받은 주위의 온도는 높아지며 주위의 엔트로피는 증가합니다.'
  },
  {
    type: 'mc', lesson: '5차시',
    q: '어떤 반응에서 ΔS<sub>계</sub> &lt; 0, ΔS<sub>주위</sub> &gt; 0 이고 |ΔS<sub>계</sub>| &lt; |ΔS<sub>주위</sub>| 이다. 이 반응은?',
    choices: ['항상 자발적이다.', '항상 비자발적이다.', '자발적이다.', '비자발적이다.'],
    answer: 2,
    keepOrder: true,
    explanation: 'ΔS<sub>전체</sub> = ΔS<sub>계</sub> + ΔS<sub>주위</sub> 이고, 주위의 증가량이 계의 감소량보다 크므로 ΔS<sub>전체</sub> &gt; 0 → <b>자발적</b>입니다. (항상 자발적인 경우는 ΔS<sub>계</sub>와 ΔS<sub>주위</sub>가 모두 0보다 클 때)'
  },
  {
    type: 'mc', lesson: '6차시',
    q: '용기에 A(g)를 넣고 A(g) → B(g) 반응을 진행시켰더니 시간에 따른 A의 농도가 다음과 같았다.<table class="data-table"><tr><th>반응 시간(min)</th><td>0</td><td>2</td><td>4</td><td>6</td></tr><tr><th>[A] (M)</th><td>0.8</td><td>0.4</td><td>0.2</td><td>0.1</td></tr></table>0 ~ 2 min 동안의 평균 반응 속도는?',
    choices: ['0.1 M/min', '0.2 M/min', '0.4 M/min', '0.8 M/min'],
    answer: 1,
    keepOrder: true,
    explanation: '평균 반응 속도 = |농도 변화| ÷ 시간 변화 = (0.8 − 0.4) M ÷ 2 min = <b>0.2 M/min</b> (2 ~ 4 min 동안은 0.1 M/min)'
  },
  {
    type: 'mc', lesson: '7차시',
    q: '2NO(g) + 2H<sub>2</sub>(g) → N<sub>2</sub>(g) + 2H<sub>2</sub>O(g) 의 초기 반응 속도 실험 결과가 다음과 같다.<table class="data-table"><tr><th>실험</th><th>[NO] (M)</th><th>[H<sub>2</sub>] (M)</th><th>초기 속도 (M/s)</th></tr><tr><td>Ⅰ</td><td>0.1</td><td>0.1</td><td>1.5×10<sup>−3</sup></td></tr><tr><td>Ⅱ</td><td>0.1</td><td>0.2</td><td>3.0×10<sup>−3</sup></td></tr><tr><td>Ⅲ</td><td>0.2</td><td>0.1</td><td>6.0×10<sup>−3</sup></td></tr></table>반응 속도 상수 k의 값은? (단위: L<sup>2</sup>/(mol<sup>2</sup>·s))',
    choices: ['0.15', '1.5', '15', '1.5×10<sup>−3</sup>'],
    answer: 1,
    keepOrder: true,
    explanation: 'Ⅰ, Ⅱ: [H<sub>2</sub>] 2배 → 속도 2배 → H<sub>2</sub>에 대해 1차.<br>Ⅰ, Ⅲ: [NO] 2배 → 속도 4배 → NO에 대해 2차. 따라서 v = k[NO]<sup>2</sup>[H<sub>2</sub>]<br>k = v ÷ ([NO]<sup>2</sup>[H<sub>2</sub>]) = 1.5×10<sup>−3</sup> ÷ (0.1<sup>2</sup>×0.1) = <b>1.5</b>'
  },
  {
    type: 'mc', lesson: '7차시',
    q: '반응 속도식이 v = k[A]<sup>2</sup>[B] 일 때, 반응 속도 상수 k의 단위는? (v의 단위는 M/s)',
    choices: ['1/s', 'L/(mol·s)', 'L<sup>2</sup>/(mol<sup>2</sup>·s)', 'mol/(L·s)'],
    answer: 2,
    keepOrder: true,
    explanation: '전체 반응 차수가 3이므로 k = v ÷ ([A]<sup>2</sup>[B]) = (M/s) ÷ M<sup>3</sup> = 1/(s·M<sup>2</sup>) = <b>L<sup>2</sup>/(mol<sup>2</sup>·s)</b><br>(0차: mol/(L·s), 1차: 1/s, 2차: L/(mol·s))'
  },
  {
    type: 'mc', lesson: '8차시',
    q: '일정한 온도에서 1차 반응 A(g) → B(g)의 반감기가 10분이다. A의 초기 농도가 8 M일 때, 30분 후 A의 농도는?',
    choices: ['4 M', '2 M', '1 M', '0.5 M'],
    answer: 2,
    keepOrder: true,
    explanation: '1차 반응은 반감기가 일정합니다. 10분마다 농도가 절반이 되므로 8 → 4 (10분) → 2 (20분) → <b>1 M (30분)</b>'
  },
  {
    type: 'mc', lesson: '8차시',
    q: '1차 반응에서 반응물의 농도가 초기 농도의 1/8이 되는 데 걸리는 시간은? (단, 반감기는 t<sub>1/2</sub>)',
    choices: ['2t<sub>1/2</sub>', '3t<sub>1/2</sub>', '4t<sub>1/2</sub>', '8t<sub>1/2</sub>'],
    answer: 1,
    keepOrder: true,
    explanation: '1 → 1/2 (t<sub>1/2</sub>) → 1/4 (2t<sub>1/2</sub>) → 1/8 (3t<sub>1/2</sub>) 이므로 <b>3t<sub>1/2</sub></b> 입니다.'
  },
  {
    type: 'mc', lesson: '9차시',
    q: '2HI(g) → H<sub>2</sub>(g) + I<sub>2</sub>(g) &nbsp; ΔH = +13 kJ 이고 정반응의 활성화 에너지가 183 kJ 일 때, 역반응의 활성화 에너지는?',
    choices: ['13 kJ', '170 kJ', '183 kJ', '196 kJ'],
    answer: 1,
    keepOrder: true,
    explanation: 'ΔH = (정반응의 활성화 에너지) − (역반응의 활성화 에너지) 이므로 13 = 183 − E<sub>a</sub>′ → E<sub>a</sub>′ = <b>170 kJ</b>'
  },
  {
    type: 'mc', lesson: '9차시',
    q: 'A(g) ⇌ B(g) 반응의 ΔH = +100 kJ 이고, 정반응의 활성화 에너지와 역반응의 활성화 에너지의 합이 280 kJ 이다. 역반응의 활성화 에너지는?',
    choices: ['90 kJ', '100 kJ', '180 kJ', '190 kJ'],
    answer: 0,
    keepOrder: true,
    explanation: '정반응 E<sub>a</sub> − 역반응 E<sub>a</sub>′ = ΔH = 100, 정반응 E<sub>a</sub> + 역반응 E<sub>a</sub>′ = 280.<br>두 식을 더하면 2E<sub>a</sub> = 380 → E<sub>a</sub> = 190 kJ, 따라서 역반응은 280 − 190 = <b>90 kJ</b>'
  },
  {
    type: 'mc', lesson: '9차시',
    q: '화학 반응이 일어나기 위한 충돌의 조건으로 옳은 것은?',
    choices: [
      '충돌 방향이 적합하기만 하면 항상 반응이 일어난다.',
      '충돌 에너지가 충분하기만 하면 방향과 관계없이 반응이 일어난다.',
      '적합한 방향으로, 활성화 에너지 이상의 에너지로 충돌해야 한다.',
      '충돌 횟수가 많기만 하면 반응이 일어난다.'
    ],
    answer: 2,
    explanation: '반응이 일어나려면 ① <b>적합한 충돌 방향</b> ② <b>활성화 에너지 이상</b>의 충분한 에너지, 두 조건을 모두 만족하는 유효 충돌이어야 합니다.'
  },
  {
    type: 'mc', lesson: '10차시',
    q: '정촉매를 사용했을 때 <b>변하지 않는 것</b>은?',
    choices: ['활성화 에너지', '반응 속도', '반응 엔탈피(ΔH)', '활성화 에너지 이상의 에너지를 갖는 분자 수'],
    answer: 2,
    keepOrder: true,
    explanation: '정촉매는 활성화 에너지를 낮춰 반응 속도를 빠르게 하고 반응할 수 있는 분자 수를 늘리지만, 반응물과 생성물의 엔탈피는 달라지지 않으므로 <b>반응 엔탈피(ΔH)는 일정</b>합니다.'
  },
  {
    type: 'mc', lesson: '10차시',
    q: '일정한 부피에서 온도를 높였을 때 반응 속도가 빨라지는 이유로 옳은 것은?',
    choices: [
      '활성화 에너지가 감소하기 때문이다.',
      '반응 엔탈피(ΔH)가 커지기 때문이다.',
      '활성화 에너지 이상의 에너지를 갖는 분자 수가 증가하기 때문이다.',
      '전체 분자 수가 증가하기 때문이다.'
    ],
    answer: 2,
    explanation: '온도가 높아지면 분자들의 평균 운동 에너지가 증가해서 <b>활성화 에너지(E<sub>a</sub>) 이상의 에너지를 갖는 분자 수</b>가 늘어납니다. 활성화 에너지, 전체 분자 수는 일정합니다.'
  },
  {
    type: 'mc', lesson: '10차시',
    q: '반응물의 농도가 증가하면 반응 속도가 빨라지는 이유를 순서대로 옳게 나열한 것은?',
    choices: [
      '단위 부피당 입자 수 증가 → 단위 시간당 충돌 횟수 증가 → 유효 충돌 증가',
      '활성화 에너지 감소 → 유효 충돌 증가',
      '분자의 평균 운동 에너지 증가 → 유효 충돌 증가',
      '반응 엔탈피 감소 → 충돌 횟수 증가'
    ],
    answer: 0,
    explanation: '농도 증가 → 단위 부피당 입자 수 증가 → 단위 시간당 충돌 횟수 증가 → 유효 충돌 증가 → 반응 속도 증가. 활성화 에너지와 평균 운동 에너지는 농도와 관계가 없습니다.'
  }
];
