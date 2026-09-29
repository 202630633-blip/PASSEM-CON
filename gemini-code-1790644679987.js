document.addEventListener('DOMContentLoaded', () => {
  // DOM 요소 가져오기
  const findBtn = document.getElementById('findBtn');
  const btnArrow = document.getElementById('btnArrow');
  const optionsGroup = document.getElementById('optionsGroup');
  const optionBtns = document.querySelectorAll('.option-btn');
  const resultBox = document.getElementById('resultBox');
  const resultTitle = document.getElementById('resultTitle');
  const resultValue = document.getElementById('resultValue');
  const progressFill = document.getElementById('progressFill');
  const resultDesc = document.getElementById('resultDesc');

  // 상태 변수
  let isOptionsVisible = false;

  // 결과창 리셋/숨김 함수
  function clearResult() {
    resultBox.classList.add('hidden');
    progressFill.style.width = '0%';
    resultTitle.textContent = '';
    resultValue.textContent = '';
    resultDesc.textContent = '';
    
    optionBtns.forEach(btn => btn.classList.remove('active'));
  }

  // [대안 찾기] 버튼 클릭 이벤트 (토글 기능)
  findBtn.addEventListener('click', () => {
    isOptionsVisible = !isOptionsVisible;

    if (isOptionsVisible) {
      optionsGroup.classList.remove('hidden');
      btnArrow.classList.add('open');
    } else {
      optionsGroup.classList.add('hidden');
      btnArrow.classList.remove('open');
      // 대안 찾기 버튼을 다시 눌러 닫을 때 결과 문구도 함께 삭제
      clearResult();
    }
  });

  // 각 대안 버튼 클릭 이벤트
  optionBtns.forEach(button => {
    button.addEventListener('click', () => {
      // 1. 기존 결과 및 선택 상태 일단 초기화 (문구 사라짐 처리)
      clearResult();

      // 2. 현재 버튼 활성화 표시
      button.classList.add('active');

      // 3. 버튼 데이터 속성(data-*) 가져오기
      const valueName = button.getAttribute('data-value');
      const usePercent = button.getAttribute('data-use');
      const descText = button.getAttribute('data-desc');

      // 4. 짧은 지연 후 새 결과 출력 (자연스러운 전환 효과)
      setTimeout(() => {
        resultTitle.textContent = `[${valueName}]`;
        resultValue.textContent = `실용도: ${usePercent}%`;
        resultDesc.textContent = descText;

        resultBox.classList.remove('hidden');

        // 게이지 바 애니메이션
        setTimeout(() => {
          progressFill.style.width = `${usePercent}%`;
        }, 50);
      }, 100);
    });
  });
});