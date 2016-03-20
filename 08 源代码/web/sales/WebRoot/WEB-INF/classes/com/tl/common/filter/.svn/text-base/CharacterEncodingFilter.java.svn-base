package com.tl.common.filter;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

/**
 * 请求与响应编码设置
 * @author lichicheng
 *
 */
public class CharacterEncodingFilter extends OncePerRequestFilter {
	private String encoding;
	private boolean forceEncoding;

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	public void setForceEncoding(boolean forceEncoding) {
		this.forceEncoding = forceEncoding;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		if ((this.forceEncoding) || (request.getCharacterEncoding() == null)) {
			request.setCharacterEncoding(this.encoding);
		}
		response.setCharacterEncoding(this.encoding);
		filterChain.doFilter(request, response);
	}

}
