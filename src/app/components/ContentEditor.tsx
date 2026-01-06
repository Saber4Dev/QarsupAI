/**
 * Simple Content Editor Component
 * 
 * Provides basic text editing features:
 * - Bold, Italic
 * - Headings (H1, H2, H3)
 * - Bullet points
 * - Direct content editing
 */

"use client"
import React, { useState, useRef } from "react";

interface ContentEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function ContentEditor({ content, onChange }: ContentEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    /**
     * Insert text at cursor position
     */
    const insertText = (before: string, after: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
        
        onChange(newText);
        
        // Restore cursor position
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + before.length + selectedText.length + after.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const formatBold = () => insertText('**', '**');
    const formatItalic = () => insertText('*', '*');
    const formatHeading1 = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const lineStart = content.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = content.indexOf('\n', start);
        const lineEndPos = lineEnd === -1 ? content.length : lineEnd;
        const line = content.substring(lineStart, lineEndPos);
        const newContent = content.substring(0, lineStart) + `# ${line}` + content.substring(lineEndPos);
        onChange(newContent);
    };
    const formatHeading2 = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const lineStart = content.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = content.indexOf('\n', start);
        const lineEndPos = lineEnd === -1 ? content.length : lineEnd;
        const line = content.substring(lineStart, lineEndPos);
        const newContent = content.substring(0, lineStart) + `## ${line}` + content.substring(lineEndPos);
        onChange(newContent);
    };
    const formatBullet = () => insertText('- ', '');

    return (
        <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-gray-800 p-2 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={formatBold}
                    className="px-3 py-1.5 text-sm font-semibold border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    title="Bold"
                >
                    <i className="mdi mdi-format-bold"></i>
                </button>
                <button
                    type="button"
                    onClick={formatItalic}
                    className="px-3 py-1.5 text-sm font-semibold border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    title="Italic"
                >
                    <i className="mdi mdi-format-italic"></i>
                </button>
                <div className="border-l border-gray-300 dark:border-gray-700 mx-1"></div>
                <button
                    type="button"
                    onClick={formatHeading1}
                    className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    title="Heading 1"
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={formatHeading2}
                    className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    title="Heading 2"
                >
                    H2
                </button>
                <div className="border-l border-gray-300 dark:border-gray-700 mx-1"></div>
                <button
                    type="button"
                    onClick={formatBullet}
                    className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    title="Bullet Point"
                >
                    <i className="mdi mdi-format-list-bulleted"></i>
                </button>
            </div>

            {/* Editor */}
            <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-96 p-4 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none resize-none font-mono text-sm"
                placeholder="Generated content will appear here. You can edit it directly..."
            />
        </div>
    );
}

