---
title: 미래연구소 딥러닝 입문 스터디 8주차
date: 2022-03-11
preview: "WK8: Convolutional Neural Network"
---

**미래연구소: https://futurelab.creatorlink.net/**

## Intro
- 여태껏 배웠던 NN → Fully Connected Layer(~= Fully Connected Network)
- Fully Connected Network는 이미지를 다룰 때 좋은 방식이 아님
  - MNIST 데이터 이용한다 가정했을 때 (28, 28) → flatten → 784 dim. → 784가 전부 fully connected → 너무 많은 weight
  - fully connected layer는 이미지의 각 영역에 대한 역할이 너무 명확히 정해져 있음 → 오리 사진 train data의 우측 상단이 배경, 좌측 하단이 부리일 경우 다음 data도 우측 상단이 배경, 좌측 하단이 부리일 것이라고 봄
  - 이렇게 되면 model의 안정성이 떨어짐 → 즉 image translation invariant 하지 않음
- 결국 fully connected layer로 만들어진 model은 image translation invariant 하지 않으므로 이미지 처리에 적절하지는 못함
- CNN 활용 분야: image classification, object detection, image segmentation, neural styler transfer, nlp 등 상당히 다양
### 고전적인 Computer Vision
- 과정: image → flatten → hand-crafted feature → n dimension vector → fully connected layer
- 의의: translation invariant gkau data의 dimension을 줄이려고 시도한 것

## Convolution 연산
- convolution 연산: 쉽게 말해 kernal(= filter) array를 가지고 컴퓨터가 세상을 바라보도록 하는 것
  - ![convolution](https://user-images.githubusercontent.com/53527600/157955736-527e8eca-c04b-411a-ac19-c11665067a07.png)
- 사용 이유: filter가 어떤 값을 가지냐에 따라 output이 달라짐
  - 어떤 filter는 vertical edge, 또 다른 어떤 filter는 horizontal edge detect → filter 따라 원하는 값을 얻을 수 있음(feature 별 filter 설정)
- 어떤 filter를 주느냐에 따라 얻는 정보가 달라짐 → translation invariant
- convolution의 결과물은 shape 달라짐
- filter(layer 1): low-level(직선 등) 인식
- filter(layer 2): 곡선, 눈 등의 주변을 인식
- filter(layer 3): 계층적 정보가 모여 high-level(직선 등) 인식
### 용어 정리
- stride: filter를 sliding하는 칸의 수(→ 1이 최소, stride 커질 수록 dim 낮아짐)
- padding: shape의 변형을 원치 않을 때 input data에 덧대주는 것 → size 키우고 싶다면 padding 많이

## Convolutional Neural Network
- 과정: input data → convolution(여러번 가능) → feature extraction → classifier
- convolution 연산 시 input data와 filter의 depth는 같아야 함

## Pooling
- Max Pooling: convolution output에 구역을 나눠서 해당 구역별로 가장 큰 값을 가져와서 dim을 줄임
- Average Pooling: max pooling에서 큰 값 선택 대신 구역의 평균치 선택하는 것과 동일

## Image Classifier Structure
![image_classifier_structure](https://user-images.githubusercontent.com/53527600/157958183-b5f1ecfe-1e0a-4ea7-a353-bd172eb939db.png)

