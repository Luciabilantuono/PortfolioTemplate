# Feature: Project Flip Card Interaction

## Phase 1 — Planning

Prompt to AI:

How can I create square project cards that flip on hover to reveal additional information on the back, using CSS 3D transforms?

AI Planning Response:

•⁠  ⁠Using a parent container with `perspective` to enable 3D depth  
•⁠  ⁠Applying `transform-style: preserve-3d` to inner elements  
•⁠  ⁠Rotating the inner card on the Y-axis for the flip effect  
•⁠  ⁠Hiding back faces using `backface-visibility`  
•⁠  ⁠Ensuring touch compatibility by supporting active states  

## Phase 2 — Implementation

What Was Implemented:

•⁠  ⁠Square-format project cards centered on the page  
•⁠  ⁠CSS-only flip animation triggered on hover and tap  
•⁠  ⁠Front face displaying project imagery  
•⁠  ⁠Back face with black background and white descriptive text  
•⁠  ⁠Consistent animation timing for all cards  

## Notes

The flip interaction was chosen to emphasize projects as visual objects. Back-face text content was kept concise to ensure readability during the interaction.
