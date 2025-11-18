CREATE TABLE note (
  id text PRIMARY KEY,
  path text NOT NULL,
  selection text NOT NULL,
  "selectorRegex" text NOT NULL,
  "userId" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE comment (
  id text PRIMARY KEY,
  "noteId" text NOT NULL REFERENCES note(id) ON DELETE CASCADE,
  body text NOT NULL,
  "parentCommentId" text REFERENCES comment(id) ON DELETE CASCADE,
  "userId" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);
