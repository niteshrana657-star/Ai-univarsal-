/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Memory Module Entry
 * File: index.ts
 * -------------------------------------------------------------
 *
 * Public exports for complete Memory module.
 * -------------------------------------------------------------
 */


// Core Memory
export {
    MemoryManager
} from "./MemoryManager";

export type {
    MemoryEntry
} from "./MemoryManager";


// Context
export {
    ContextManager
} from "./ContextManager";

export type {
    AIContext
} from "./ContextManager";


// Conversation Memory
export {
    ConversationMemory
} from "./ConversationMemory";

export type {
    ConversationEntry
} from "./ConversationMemory";


// Long Term Memory
export {
    LongTermMemory
} from "./LongTermMemory";

export type {
    LongTermMemoryEntry
} from "./LongTermMemory";


// Short Term Memory
export {
    ShortTermMemory
} from "./ShortTermMemory";

export type {
    ShortTermMemoryEntry
} from "./ShortTermMemory";


// User Profile Memory
export {
    UserProfileMemory
} from "./UserProfileMemory";

export type {
    UserProfileEntry
} from "./UserProfileMemory";


// Security
export {
    MemoryEncryption
} from "./MemoryEncryption";


// Storage
export {
    MemoryStorageAdapter
} from "./MemoryStorageAdapter";

export type {
    StorageRecord,
    StorageProvider
} from "./MemoryStorageAdapter";


// Search
export {
    MemorySearchEngine
} from "./MemorySearchEngine";

export type {
    SearchableMemory,
    SearchResult
} from "./MemorySearchEngine";


// Sync
export {
    MemorySyncService
} from "./MemorySyncService";

export type {
    SyncResult
} from "./MemorySyncService";
