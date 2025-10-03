import * as React from "react";

const cardStyles = {
  backgroundColor: 'var(--card)',
  color: 'var(--card-foreground)',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '24px',
  borderRadius: '12px',
  border: '1px solid var(--border)',
  padding: '24px 0',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const cardHeaderStyles = {
  display: 'grid',
  gridTemplateRows: 'auto auto',
  alignItems: 'start',
  gap: '6px',
  padding: '0 24px',
};

const cardTitleStyles = {
  lineHeight: 1,
  fontWeight: '600',
};

const cardDescriptionStyles = {
  color: 'var(--muted-foreground)',
  fontSize: '14px',
};

const cardContentStyles = {
  padding: '0 24px',
};

const cardFooterStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 24px',
};

function Card({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      style={{
        ...cardStyles,
        ...style,
      }}
      {...props}
    />
  );
}

function CardHeader({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      style={{
        ...cardHeaderStyles,
        ...style,
      }}
      {...props}
    />
  );
}

function CardTitle({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      style={{
        ...cardTitleStyles,
        ...style,
      }}
      {...props}
    />
  );
}

function CardDescription({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      style={{
        ...cardDescriptionStyles,
        ...style,
      }}
      {...props}
    />
  );
}

function CardAction({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      style={{
        gridColumn: 2,
        gridRow: '1 / span 2',
        alignSelf: 'start',
        justifySelf: 'end',
        ...style,
      }}
      {...props}
    />
  );
}

function CardContent({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      style={{
        ...cardContentStyles,
        ...style,
      }}
      {...props}
    />
  );
}

function CardFooter({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      style={{
        ...cardFooterStyles,
        ...style,
      }}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
