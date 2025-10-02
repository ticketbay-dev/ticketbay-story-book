import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from './Checkbox';
import { RadioGroup } from './Radio';
import { Toggle } from './Toggle';
import { Quantity } from './Quantity';
import { Chips } from './Chips';
import { PaymentMethod } from './PaymentMethod';
import { FilterAnchor } from './FilterAnchor';

import './controls.css';

// Combined Controls showcase component
const ControlsShowcase = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '800px' }}>
      
      {/* Checkbox Section */}
      <section>
        <h3 style={{ marginBottom: '16px', color: '#343a40' }}>Checkbox</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Checkbox label="기본 체크박스" />
          <Checkbox label="체크된 상태" checked />
          <Checkbox label="비활성화 상태" disabled />
          <Checkbox 
            label="필수 입력" 
            required 
            helperText="이 항목은 필수입니다." 
          />
          <Checkbox 
            label="에러 상태" 
            error 
            helperText="오류가 발생했습니다." 
          />
        </div>
      </section>

      {/* Radio Group Section */}
      <section>
        <h3 style={{ marginBottom: '16px', color: '#343a40' }}>Radio Button</h3>
        <RadioGroup
          label="결제 방법 선택"
          options={[
            { value: 'card', label: '신용카드', description: '안전하고 빠른 결제' },
            { value: 'bank', label: '무통장입금', description: '계좌이체로 결제' },
            { value: 'phone', label: '휴대폰 결제', description: '휴대폰으로 간편결제' }
          ]}
          defaultValue="card"
          required
        />
      </section>

      {/* Toggle Section */}
      <section>
        <h3 style={{ marginBottom: '16px', color: '#343a40' }}>Toggle Switch</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Toggle label="알림 받기" defaultChecked />
          <Toggle label="자동 로그인" />
          <Toggle 
            label="마케팅 수신 동의" 
            helperText="이벤트 및 혜택 정보를 받아보세요" 
          />
        </div>
      </section>

      {/* Quantity Section */}
      <section>
        <h3 style={{ marginBottom: '16px', color: '#343a40' }}>Quantity Selector</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <Quantity 
            label="수량" 
            defaultValue={1} 
            min={1} 
            max={10} 
          />
          <Quantity 
            label="인원 수" 
            defaultValue={2} 
            min={0} 
            max={20} 
            showInput={false}
          />
        </div>
      </section>

      {/* Choice Chips Section */}
      <section>
        <h3 style={{ marginBottom: '16px', color: '#343a40' }}>Choice Chips</h3>
        <Chips
          label="관심 카테고리"
          options={[
            { value: 'concert', label: '콘서트' },
            { value: 'musical', label: '뮤지컬' },
            { value: 'sports', label: '스포츠' },
            { value: 'exhibition', label: '전시' },
            { value: 'festival', label: '페스티벌' }
          ]}
          multiple
          defaultValue={['concert', 'musical']}
          variant="outlined"
        />
      </section>

      {/* Payment Method Section */}
      <section>
        <h3 style={{ marginBottom: '16px', color: '#343a40' }}>Payment Method</h3>
        <PaymentMethod
          label="결제 수단"
          options={[
            {
              value: 'creditcard',
              label: '신용카드',
              description: '간편하고 안전한 카드 결제',
              icon: (
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  backgroundColor: '#228be6', 
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>💳</div>
              )
            },
            {
              value: 'kakaopay',
              label: '카카오페이',
              description: '카카오톡으로 간편결제',
              badge: '인기',
              icon: (
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  backgroundColor: '#fee500', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>💬</div>
              )
            },
            {
              value: 'naverpay',
              label: '네이버페이',
              description: '네이버 간편결제',
              icon: (
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  backgroundColor: '#03c75a', 
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>N</div>
              )
            }
          ]}
          defaultValue="creditcard"
        />
      </section>

      {/* Filter Anchor Section */}
      <section>
        <h3 style={{ marginBottom: '16px', color: '#343a40' }}>Filter Anchor</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#495057' }}>탭 스타일</h4>
            <FilterAnchor
              variant="tabs"
              options={[
                { value: 'all', label: '전체', count: 245 },
                { value: 'concert', label: '콘서트', count: 89 },
                { value: 'musical', label: '뮤지컬', count: 56 },
                { value: 'sports', label: '스포츠', count: 34 }
              ]}
              defaultValue="all"
            />
          </div>
          
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#495057' }}>필 스타일</h4>
            <FilterAnchor
              variant="pills"
              options={[
                { value: 'seoul', label: '서울' },
                { value: 'busan', label: '부산' },
                { value: 'daegu', label: '대구' },
                { value: 'incheon', label: '인천' },
                { value: 'gwangju', label: '광주' }
              ]}
              multiple
              scrollable
            />
          </div>
        </div>
      </section>

    </div>
  );
};

const meta = {
  title: 'Ticketbay/Controls',
  component: ControlsShowcase,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '티켓베이 디자인 시스템의 모든 컨트롤 컴포넌트들을 한 눈에 볼 수 있는 쇼케이스입니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ControlsShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllControls: Story = {
  name: '전체 컨트롤 컴포넌트',
};

// Individual component stories
export const CheckboxVariations: Story = {
  name: 'Checkbox 변형',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Checkbox size="small" label="Small" />
        <Checkbox size="medium" label="Medium" />
        <Checkbox size="large" label="Large" />
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Checkbox color="ticket-magenta" label="Magenta" checked />
        <Checkbox color="blue-6" label="Blue" checked />
        <Checkbox color="green-6" label="Green" checked />
      </div>
      <Checkbox indeterminate label="부분 선택" />
    </div>
  ),
};

export const RadioVariations: Story = {
  name: 'Radio Button 변형',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <RadioGroup
        label="세로 배치"
        direction="vertical"
        options={[
          { value: 'option1', label: '옵션 1' },
          { value: 'option2', label: '옵션 2' },
          { value: 'option3', label: '옵션 3' }
        ]}
      />
      
      <RadioGroup
        label="가로 배치"
        direction="horizontal"
        options={[
          { value: 'yes', label: '예' },
          { value: 'no', label: '아니오' }
        ]}
      />
    </div>
  ),
};

export const ToggleVariations: Story = {
  name: 'Toggle 변형',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Toggle size="small" label="Small" />
        <Toggle size="medium" label="Medium" />
        <Toggle size="large" label="Large" />
      </div>
      <Toggle 
        label="아이콘 포함" 
        checked 
        icons={{
          on: '🌙',
          off: '☀️'
        }}
      />
      <Toggle labelPosition="left" label="왼쪽 라벨" />
    </div>
  ),
};

export const ChipsVariations: Story = {
  name: 'Choice Chips 변형',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Chips
        label="Outlined (기본)"
        variant="outlined"
        options={[
          { value: 'tag1', label: '태그1' },
          { value: 'tag2', label: '태그2' },
          { value: 'tag3', label: '태그3' }
        ]}
        multiple
      />
      
      <Chips
        label="Filled"
        variant="filled"
        options={[
          { value: 'tag1', label: '태그1' },
          { value: 'tag2', label: '태그2' },
          { value: 'tag3', label: '태그3' }
        ]}
        multiple
      />
      
      <Chips
        label="Soft"
        variant="soft"
        options={[
          { value: 'tag1', label: '태그1' },
          { value: 'tag2', label: '태그2' },
          { value: 'tag3', label: '태그3' }
        ]}
        multiple
      />
    </div>
  ),
};

export const PaymentMethodVariations: Story = {
  name: 'Payment Method 변형',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PaymentMethod
        label="리스트 레이아웃"
        layout="list"
        options={[
          { value: 'card', label: '신용카드', description: '빠르고 안전한 결제' },
          { value: 'bank', label: '계좌이체', description: '실시간 계좌이체' }
        ]}
      />
      
      <PaymentMethod
        label="그리드 레이아웃"
        layout="grid"
        options={[
          { value: 'card', label: '신용카드' },
          { value: 'kakao', label: '카카오페이' },
          { value: 'naver', label: '네이버페이' },
          { value: 'toss', label: '토스페이' }
        ]}
      />
    </div>
  ),
};

export const FilterAnchorVariations: Story = {
  name: 'Filter Anchor 변형',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Tabs</h4>
        <FilterAnchor
          variant="tabs"
          options={[
            { value: 'all', label: '전체', count: 100 },
            { value: 'new', label: '신규', count: 25 },
            { value: 'popular', label: '인기', count: 45 }
          ]}
        />
      </div>
      
      <div>
        <h4 style={{ marginBottom: '8px' }}>Pills</h4>
        <FilterAnchor
          variant="pills"
          options={[
            { value: 'all', label: '전체' },
            { value: 'discount', label: '할인' },
            { value: 'free', label: '무료' }
          ]}
          multiple
        />
      </div>
      
      <div>
        <h4 style={{ marginBottom: '8px' }}>Links</h4>
        <FilterAnchor
          variant="links"
          options={[
            { value: 'recent', label: '최신순' },
            { value: 'popular', label: '인기순' },
            { value: 'price', label: '가격순' }
          ]}
        />
      </div>
    </div>
  ),
};