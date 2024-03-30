-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "favorite" BOOLEAN DEFAULT false,
    "color" TEXT,
    "content" TEXT,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("color", "content", "createdAt", "favorite", "id", "title", "updatedAt", "userId") SELECT "color", "content", "createdAt", "favorite", "id", "title", "updatedAt", "userId" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
CREATE INDEX "tasks_createdAt_userId_favorite_idx" ON "tasks"("createdAt", "userId", "favorite");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
