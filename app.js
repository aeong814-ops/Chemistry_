/*
 * 화학 영역 시험 퀴즈 (app.js)
 * 순수 HTML/CSS/JS 로 동작합니다. (빌드 · 서버 필요 없음)
 */
(function () {
  'use strict';

  /* ================= 설정 (여기만 고치면 됩니다) ================= */
  const CONFIG = {
    images: {
      wrong:   'images/wrong.jpg',    // 오답  : 정답 같은 오답
      correct: 'images/correct.jpg',  // 정답  : 정답!
      streak:  'images/streak.jpg',   // 연속 정답 : 기적의 정답 퍼레이드
      perfect: 'images/perfect.jpg'   // 올 정답 : 100점
    },
    streakMin: 2,                     // 몇 문제 연속으로 맞히면 연속 정답 사진을 보여줄지
    showExplanationOnCorrect: true,  // true 로 바꾸면 정답일 때도 문제풀이를 보여줌
    defaultCount: '20'
  };

  const CIRCLED = ['①', '②', '③', '④', '⑤'];

  /* ================= 상태 ================= */
  const state = {
    mode: 'all',
    count: CONFIG.defaultCount,
    list: [],
    idx: 0,
    correct: 0,
    streak: 0,
    maxStreak: 0,
    wrongs: [],       // 틀린 문제 기록 { q, correctText }
    answered: false,
    current: null,    // 현재 문제 { q, choices }
    isReview: false
  };

  /* ================= 유틸 ================= */
  const $ = (id) => document.getElementById(id);
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const showScreen = (name) => {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    $('screen-' + name).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 이미지 표시: images 폴더 경로가 안 맞으면 images.js 에 내장된 이미지로 대체
  function setImg(el, key) {
    el.onerror = () => {
      const data = window.IMAGE_DATA && window.IMAGE_DATA[key];
      el.onerror = null;
      if (data) el.src = data;
    };
    el.src = CONFIG.images[key];
  }
  // 이미지 미리 불러오기 (전환 시 깜빡임 방지)
  Object.keys(CONFIG.images).forEach((k) => setImg(new Image(), k));

  /* ================= 시작 화면 ================= */
  function bindChips(groupId, key) {
    const group = $(groupId);
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      group.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
      btn.classList.add('active');
      state[key] = btn.dataset.value;
    });
  }
  bindChips('opt-mode', 'mode');
  bindChips('opt-count', 'count');

  function buildList() {
    let pool = QUESTIONS.filter((q) => state.mode === 'all' || q.type === state.mode);
    pool = shuffle(pool);
    if (state.count !== 'all') pool = pool.slice(0, parseInt(state.count, 10));
    return pool;
  }

  function startQuiz(list, isReview) {
    state.list = list;
    state.idx = 0;
    state.correct = 0;
    state.streak = 0;
    state.maxStreak = 0;
    state.wrongs = [];
    state.isReview = !!isReview;
    showScreen('quiz');
    renderQuestion();
  }

  $('btn-start').addEventListener('click', () => startQuiz(buildList(), false));

  /* ================= 문제 화면 ================= */
  function updateHud() {
    $('hud-progress').textContent = `문제 ${state.idx + 1} / ${state.list.length}`;
    $('hud-score').textContent = `맞힌 문제 ${state.correct}`;
    $('hud-streak').textContent = state.streak >= 2 ? `🔥 ${state.streak}연속 정답!` : '';
    $('progress-bar').style.width = `${(state.idx / state.list.length) * 100}%`;
  }

  function renderQuestion() {
    const q = state.list[state.idx];
    state.answered = false;
    updateHud();

    $('q-no').textContent = `${state.idx + 1}.`;
    $('q-tag').textContent = q.type === 'ox' ? 'O / X' : '객관식';
    $('q-lesson').textContent = q.lesson;
    $('q-text').innerHTML = q.q;
    $('feedback').classList.add('hidden');

    const box = $('q-choices');
    box.innerHTML = '';

    if (q.type === 'ox') {
      box.className = 'choices ox';
      state.current = { q, correctText: q.answer ? 'O' : 'X' };
      [true, false].forEach((val) => {
        const b = document.createElement('button');
        b.className = 'choice ox-btn';
        b.dataset.o = String(val);
        b.textContent = val ? 'O' : 'X';
        b.addEventListener('click', () => answer(b, val === q.answer));
        box.appendChild(b);
      });
    } else {
      box.className = 'choices';
      let items = q.choices.map((text, i) => ({ text, correct: i === q.answer }));
      if (!q.keepOrder) items = shuffle(items);
      const correctPos = items.findIndex((it) => it.correct);
      state.current = { q, correctText: `${CIRCLED[correctPos]} ${items[correctPos].text}` };
      items.forEach((it, i) => {
        const b = document.createElement('button');
        b.className = 'choice';
        b.innerHTML = `<span class="mark">${CIRCLED[i]}</span><span>${it.text}</span>`;
        b.dataset.correct = String(it.correct);
        b.addEventListener('click', () => answer(b, it.correct));
        box.appendChild(b);
      });
    }
  }

  function answer(btn, isCorrect) {
    if (state.answered) return;
    state.answered = true;

    // 버튼 잠그고 정답/오답 표시
    const all = $('q-choices').querySelectorAll('.choice');
    all.forEach((b) => { b.disabled = true; });
    const isOx = state.current.q.type === 'ox';
    all.forEach((b) => {
      const bCorrect = isOx ? (b.dataset.o === 'true') === state.current.q.answer : b.dataset.correct === 'true';
      if (bCorrect) b.classList.add('correct');
    });
    if (!isCorrect) btn.classList.add('wrong');

    // 점수 · 연속 정답 계산
    if (isCorrect) {
      state.correct++;
      state.streak++;
      state.maxStreak = Math.max(state.maxStreak, state.streak);
    } else {
      state.streak = 0;
      state.wrongs.push(state.current);
    }
    updateHud();

    showFeedback(isCorrect);
  }

  function showFeedback(isCorrect) {
    const stamp = $('fb-stamp');
    const img = $('fb-img');
    const ex = $('fb-explain');
    const q = state.current.q;

    if (isCorrect) {
      if (state.streak >= CONFIG.streakMin) {
        stamp.className = 'stamp streak';
        stamp.textContent = `${state.streak}연속 정답!`;
        setImg(img, 'streak');
      } else {
        stamp.className = 'stamp right';
        stamp.textContent = '정답!';
        setImg(img, 'correct');
      }
    } else {
      stamp.className = 'stamp miss';
      stamp.textContent = '오답...';
      setImg(img, 'wrong');
    }
    img.alt = stamp.textContent;

    // 문제풀이 (오답일 때)
    if (!isCorrect || CONFIG.showExplanationOnCorrect) {
      ex.innerHTML =
        `<span class="ex-title">문제풀이</span>` +
        `<span class="ex-answer">정답 : ${state.current.correctText}</span>` +
        q.explanation;
      ex.classList.remove('hidden');
    } else {
      ex.classList.add('hidden');
    }

    const isLast = state.idx === state.list.length - 1;
    $('btn-next').textContent = isLast ? '결과 보기' : '다음 문제 →';
    $('feedback').classList.remove('hidden');
    $('btn-next').focus({ preventScroll: true });
    setTimeout(() => $('feedback').scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }

  $('btn-next').addEventListener('click', () => {
    if (state.idx >= state.list.length - 1) {
      showResult();
    } else {
      state.idx++;
      renderQuestion();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  /* 키보드: 1~5 / O·X / Enter */
  document.addEventListener('keydown', (e) => {
    if (!$('screen-quiz').classList.contains('active') || state.answered) return;
    const q = state.current && state.current.q;
    if (!q) return;
    const buttons = $('q-choices').querySelectorAll('.choice');
    if (q.type === 'ox') {
      const k = e.key.toLowerCase();
      if (k === 'o' || k === 'ㅐ' || e.key === 'ArrowLeft')  buttons[0].click();
      if (k === 'x' || k === 'ㅌ' || e.key === 'ArrowRight') buttons[1].click();
    } else {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= buttons.length) buttons[n - 1].click();
    }
  });

  /* ================= 결과 화면 ================= */
  function showResult() {
    const total = state.list.length;
    const score = Math.round((state.correct / total) * 100);
    const perfect = state.correct === total;

    $('progress-bar').style.width = '100%';
    $('res-title').textContent = state.isReview ? '틀린 문제 복습 결과' : '채점 결과';
    $('res-score').innerHTML = `${score}<small>점</small>`;
    $('res-detail').textContent =
      `${total}문제 중 ${state.correct}문제 정답 · 최대 ${state.maxStreak}연속 정답`;

    const img = $('res-img');
    if (perfect) {
      $('res-msg').textContent = '올 정답! 만점의 주인공!';
      setImg(img, 'perfect');
      img.alt = '100점';
      img.classList.remove('hidden');
      confetti();
    } else {
      img.classList.add('hidden');
      $('res-msg').textContent =
        score >= 80 ? '아깝다! 한 끗 차이!' :
        score >= 50 ? '정답 같은 오답이 조금 있었네요!' :
                      '오답 퍼레이드... 한 번 더 도전해 볼까요?';
    }

    // 틀린 문제 다시 보기
    const review = $('res-review');
    const list = $('res-review-list');
    list.innerHTML = '';
    if (state.wrongs.length) {
      state.wrongs.forEach((w, i) => {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML =
          `<div class="r-q">${i + 1}. [${w.q.lesson}] ${w.q.q}</div>` +
          `<div class="r-a">정답 : ${w.correctText}</div>` +
          `<div class="r-ex">${w.q.explanation}</div>`;
        list.appendChild(div);
      });
      review.classList.remove('hidden');
      $('btn-retry-wrong').classList.remove('hidden');
    } else {
      review.classList.add('hidden');
      $('btn-retry-wrong').classList.add('hidden');
    }

    showScreen('result');
  }

  $('btn-retry').addEventListener('click', () => startQuiz(buildList(), false));
  $('btn-retry-wrong').addEventListener('click', () => {
    startQuiz(shuffle(state.wrongs.map((w) => w.q)), true);
  });
  $('btn-home').addEventListener('click', () => showScreen('start'));

  /* ================= 컨페티 ================= */
  function confetti() {
    const colors = ['#ffd21f', '#e5262a', '#1f5fd6', '#19a14b', '#ffffff'];
    for (let i = 0; i < 70; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = 2 + Math.random() * 2.5 + 's';
      c.style.animationDelay = Math.random() * 0.8 + 's';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 6000);
    }
  }
})();
