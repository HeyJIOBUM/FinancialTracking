package org.heyjiobum.fintrackbackend.app.error;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationError {
    private int statusCode;
    private String message;
}
