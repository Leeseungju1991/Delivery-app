import { MissionTemplate } from '@/types';

export const MISSION_TEMPLATES: MissionTemplate[] = [
  {
    "id": 1,
    "title": "지정장소 깨끗하게 유지하기",
    "description": "정리가 필요한 장소를 지정해 깨끗하게 유지하는 습관을 가져봅시다🥰",
    "customPrompt": "어떤 장소를 깨끗하게 유지할까요?",
    "customOptions": [
      "책상",
      "테이블",
      "식탁",
      "침대",
      "침대 협탁",
      "책꽂이",
      "티비 선반",
      "화장대 기타"
    ],
    "tags": [
      "인증 전에 막 치웠어요",
      "피곤해서 못했어요",
      "어제보다 더러워졌어요",
      "완전 깨끗하게 다 치웠어요"
    ],
    "photoRequired": true,
    "validWindow": "3시간",
    "recommendSchedule": "- 매일 \n- 저녁 8시"
  },
  {
    "id": 2,
    "title": "매일 집안일 한가지 실천",
    "description": "넘쳐나는 집안일을 한 번에 다하는 것은 힘들죠😂 지금부터 하나씩 해결해봅시다. \n오늘은 어떤 집안일은 하셨나요?",
    "customPrompt": "",
    "customOptions": [],
    "tags": [
      "설거지 하기",
      "바닥쓸기",
      "바닥 물걸레 청소",
      "화장실 바닥 청소",
      "변기 청소",
      "세면대 청소",
      "분리수거",
      "쓰레기통 비우기",
      "음식물쓰레기 버리기",
      "냉장고 정리하기",
      "옷장 정리",
      "빨래하기",
      "머리카락 제거",
      "빨래개기",
      "침대 청소",
      "기타(직접 입력 x)"
    ],
    "photoRequired": true,
    "validWindow": "3시간",
    "recommendSchedule": "-매일\n-저녁 8시"
  },
  {
    "id": 3,
    "title": "집밥 도전하기",
    "description": "자극적인 바깥 음식을 멀리하고 \n집에서 직접 요리에 도전해보세요.",
    "customPrompt": "",
    "customOptions": [],
    "tags": [
      "집밥이에요",
      "귀찮아서 배달 시켰어요",
      "외식했어요",
      "편의점에서 간단하게 때웠어요",
      "남의 집에서 먹었어요"
    ],
    "photoRequired": true,
    "validWindow": "2시간",
    "recommendSchedule": "-매일"
  },
  {
    "id": 4,
    "title": "저녁식사 8시 이전에 먹기",
    "description": "잠을 푹 자기 위해서는 저녁 습관이 매우 중요해요! 너무 늦지 않은 시간에 저녁식사를 해결해봅시다😉",
    "customPrompt": "",
    "customOptions": [],
    "tags": [
      "집밥이에요",
      "귀찮아서 배달 시켰어요",
      "외식했어요",
      "편의점에서 간단하게 때웠어요",
      "남의 집에서 먹었어요"
    ],
    "photoRequired": true,
    "validWindow": "2시간",
    "recommendSchedule": "-매일"
  },
  {
    "id": 5,
    "title": "아침 챙겨먹기",
    "description": "건강을 생각한다면 아침식사는 필수입니다!\n아침으로 잠자고 있던 몸과 두뇌를 깨워주세요😀",
    "customPrompt": "",
    "customOptions": [],
    "tags": [
      "과일",
      "밥",
      "시리얼",
      "빵",
      "주스류(과일,녹즙)",
      "요거트",
      "죽/수프",
      "바형 제품",
      "곡물류",
      "쉐이크",
      "기타"
    ],
    "photoRequired": true,
    "validWindow": "2시간",
    "recommendSchedule": "-매일"
  },
  {
    "id": 6,
    "title": "조금씩 건강에 신경쓰기",
    "description": "아주 작은 습관 하나가 건강한 인생을 만든답니다😉\n오늘 실천한 나를 위한 건강 습관은 무엇인가요?",
    "customPrompt": "",
    "customOptions": [],
    "tags": [
      "영양제 챙겨먹기",
      "하루 한 끼 샐러드 먹기",
      "저칼로리 식단",
      "군것질 안 하기",
      "밀가루 줄이기",
      "탄수화물 줄이기",
      "운동 하기",
      "기타"
    ],
    "photoRequired": true,
    "validWindow": "3시간",
    "recommendSchedule": "-매일"
  }
];
