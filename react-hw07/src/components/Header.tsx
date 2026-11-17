import styled from "styled-components";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const HeaderWrapper = styled.header`
  text-align: center;
  margin-bottom: 24px;
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  border-radius: 16px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
`;

const Icon = styled.span`
  font-size: 26px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #0f172a 30%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 6px;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: var(--text-muted);
  font-weight: 400;
`;

export function Header({
  title = "Task List",
  subtitle = "Організуй свої щоденні справи та завдання",
}: HeaderProps) {
  return (
    <HeaderWrapper>
      <IconWrapper>
        <Icon>📋</Icon>
      </IconWrapper>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </HeaderWrapper>
  );
}
