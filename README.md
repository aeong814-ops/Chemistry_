# 화학 영역 시험 퀴즈

화학Ⅱ 학습지(1~10차시: 엔탈피, 헤스 법칙, 엔트로피, 반응 속도, 활성화 에너지, 촉매)로 만든 O/X + 객관식 퀴즈입니다.
순수 HTML/CSS/JS라서 빌드나 서버 없이 `index.html`만 열면 동작합니다.

## 기능

| 상황 | 화면 |
|---|---|
| 오답 | `images/wrong.jpg` (정답 같은 오답) + **문제풀이** |
| 정답 | `images/correct.jpg` (정답!) |
| 2연속 이상 정답 | 맞힐 때마다 `images/streak.jpg` (기적의 정답 퍼레이드) + "N연속 정답!" |
| 모든 문제 정답 | 결과 화면에 `images/perfect.jpg` (100점) + 컨페티 |

- 시험 유형(O/X + 객관식 / O/X만 / 객관식만), 문항 수(10 / 20 / 전체) 선택
- 문제·객관식 보기 순서 랜덤
- 결과 화면에서 틀린 문제 풀이 다시 보기, 틀린 문제만 다시 풀기
- 키보드 지원: 객관식 `1`~`5`, O/X 문제 `O` / `X`

## 이미지가 안 보일 때

- `images` 폴더가 저장소 맨 위에 있고, 파일 이름이 `wrong.jpg` `correct.jpg` `streak.jpg` `perfect.jpg` 인지 확인하세요. (GitHub은 대소문자를 구분합니다)
- 확인이 어렵다면 `images.js`만 같이 올리세요. 이미지가 내장되어 있어 폴더 없이도 표시됩니다.

## 폴더 구조

```
quiz/
├─ index.html      화면 구조
├─ style.css       디자인 (시험지 + 예능 느낌)
├─ app.js          퀴즈 로직 / 설정(CONFIG)
├─ questions.js    문제 은행 (문제·정답·풀이)
├─ images.js       이미지 내장본 (폴더 경로가 틀려도 이미지가 뜨게 하는 예비용)
├─ README.md
└─ images/
   ├─ wrong.jpg    오답
   ├─ correct.jpg  정답
   ├─ streak.jpg   연속 정답
   └─ perfect.jpg  올 정답 (100점)
```

## GitHub Pages로 배포하기

1. GitHub에서 새 저장소를 만듭니다.
2. 위 파일과 `images` 폴더 전체를 저장소에 업로드합니다. (**Add file → Upload files**)
3. **Settings → Pages → Branch: `main` / `(root)`** 로 저장합니다.
4. 1~2분 뒤 `https://<아이디>.github.io/<저장소이름>/` 주소를 학생에게 공유하면 됩니다.

## 문제 추가 / 수정

`questions.js`에 아래 형식으로 추가하면 됩니다. `<sub>`, `<sup>` 같은 간단한 HTML을 쓸 수 있습니다.

```js
// O/X
{ type: 'ox', lesson: '3차시', q: '문제 내용', answer: true, explanation: '문제풀이' },

// 객관식 (answer 는 정답 보기의 번호, 0부터 시작)
{ type: 'mc', lesson: '3차시', q: '문제 내용',
  choices: ['보기1', '보기2', '보기3', '보기4'], answer: 0,
  keepOrder: true,   // 보기 순서를 섞지 않으려면 (숫자/ㄱㄴㄷ 보기에 추천)
  explanation: '문제풀이' },
```

## 설정 바꾸기 (`app.js` 맨 위 `CONFIG`)

- `streakMin` : 몇 연속 정답부터 3번째 사진을 보여줄지 (기본 2)
- `showExplanationOnCorrect` : `true`면 정답일 때도 문제풀이 표시 (기본 `false`)
- `images` : 이미지 파일 경로 교체
