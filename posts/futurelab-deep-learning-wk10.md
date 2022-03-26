---
title: 미래연구소 딥러닝 입문 스터디 10주차
date: 2022-03-26
preview: "WK10: Normalization Layers and Transfer Learning"
---

**미래연구소: https://futurelab.creatorlink.net/**

## Normalization Layers
### Neural Network에서의 Normalization
- input data
- layer
  - batch normalization
### Batch Normalization
- Covariant Shift: data domain이 이동함에 따라서 생기는 차이
- input data는 normalization이 되어 있기 때문에 다음 node는 normalized 값을 받는 것이 익숙할 것
- SGD는 n번째 batch에 맞춰진 parameter를 n+1번째 batch의 parameter로 사용함
- 따라서 내부에서의 covariant shift를 방지하기 위해(→ 다음 layer가 normalized input을 받을 수 있도록) activation 전에 batch normalization 진행
- 이때까지 알고 있던 방식: `input layer → wx+b → z|a → wz+b → z|a → ...`
  - batch normalization을 하면 `z|a` → `z|z^|a`
  - z^: z를 normalize
- FCN, ConvNet 등 batch normalization을 적용하는 것은 어렵지 않음
  - ![FCN_ConNet_batch_normalization](https://user-images.githubusercontent.com/53527600/160222946-fa8c1406-ff10-43b7-9849-cc0497d47951.png)
- 단점
  - batch_size가 작으면 평균, 분산이 너무 부정확
  - RNN은 같은 layer에서도 cell의 이동에 따라 다른 feature들을 받으므로 통계량이 매번 다름(→ cell마다 BN을 적용하기에 너무 연산량이 많음)
### Layer Normalization
![layer_normalization](https://user-images.githubusercontent.com/53527600/160223033-74bffc99-ebce-4246-bf28-5ec56f5bc169.png)
### Instance Normalization
![instance_normalization](https://user-images.githubusercontent.com/53527600/160223061-b6c72851-25cc-4270-abd5-144a5678d500.png)

## Transfer learning
### Deep Learning의 한계
- DL의 대부분은 supervised learning에 집중이 되어있음
- supervised learning이 아니라 하더라도 일단 data가 많이 필요함
- data가 많으면 train 시간 또한 많이 소요됨
- low level feature는 pre-trained model, 끝 단(내가 가진 data의 양에 따라 더 이전 layer부터 내가 가진 data를 사용할 수도 있음)만 내가 가진 data로 진행
### Fine Tuning
- 가진 data에 맞게 pre-trained model의 layer를 freeze하고 learning rate를 조절해 주는 과정
- ![fine_tuning_전략](https://user-images.githubusercontent.com/53527600/160223361-179107c5-e920-4956-ab38-4e3e931ff1b9.png)
